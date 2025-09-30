// src/sonification/Sonifier.ts
import * as Tone from 'tone';
import { scaleLinear, clamp } from '@/utils/scales';

export type Snapshot = {
  L: number;        // % 65+ at year t
  dLdt: number;     // recent annual change (e.g., Δ over previous year)
  accel?: number;   // optional acceleration flag
};

export class Sonifier {
  private synth?: Tone.PolySynth;
  private drone?: Tone.Oscillator;
  private dissonance?: Tone.PolySynth;
  private reverb?: Tone.Reverb;
  private enabled = false;
  private inited = false;

  async init() {
    if (this.inited) return;
    // Simple signal chain: synth -> reverb -> destination
    this.reverb = new Tone.Reverb({ decay: 1.8, wet: 0.25 });
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2 }
    }).connect(this.reverb);
    this.reverb.connect(Tone.getDestination());

    // A light drone we can raise when country is above global
    this.drone = new Tone.Oscillator({ type: 'sine', frequency: 110, volume: -24 });
    this.drone.connect(Tone.getDestination());

    this.dissonance = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.005, decay: 0.05, sustain: 0, release: 0.05 }
    }).connect(Tone.getDestination());

    this.inited = true;
  }

  async enable() {
    await this.init();
    await Tone.start(); // Necessary on first user gesture
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
    this.drone?.stop();
  }

  setDroneActive(active: boolean) {
    if (!this.enabled || !this.drone) return;
    if (active && this.drone.state !== 'started') this.drone.start();
    if (!active && this.drone.state === 'started') this.drone.stop();
  }

  /**
   * Map data to sound:
   * - Pitch ~ Level (L): map 0–35% ⇒ MIDI 48–81
   * - Tempo ~ |dL/dt|
   * - Add brief dissonant blip if acceleration > 0
   */
  playSnapshot(s: Snapshot) {
    if (!this.enabled || !this.synth) return;

    const { L, dLdt, accel = 0 } = s;
    const midi = Math.round(scaleLinear(L, [0, 35], [48, 81])); // C2..A5
    const note = Tone.Frequency.midiToNote(midi);

    const bpm = scaleLinear(Math.abs(dLdt), [0, 0.6], [60, 160]); // tune to your data
    Tone.Transport.bpm.value = clamp(bpm, 40, 180);

    this.synth.triggerAttackRelease(note, '8n');

    if (accel > 0 && this.dissonance) {
      // a minor second above for urgency
      const dis = Tone.Frequency(midi + 1, 'midi').toNote();
      this.dissonance.triggerAttackRelease(dis, '16n', undefined, 0.7);
    }
  }

  /**
   * A short “threshold chime” (ascending fifth)
   */
  thresholdChime() {
    if (!this.enabled || !this.synth) return;
    const now = Tone.now();
    this.synth.triggerAttackRelease('C5', '16n', now);
    this.synth.triggerAttackRelease('G5', '16n', now + 0.12);
  }

  dispose() {
    this.synth?.dispose();
    this.drone?.dispose();
    this.dissonance?.dispose();
    this.reverb?.dispose();
  }
}
