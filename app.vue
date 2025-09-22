<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>
<template>
  <div >
    <Analytics />
    <!-- <NuxtWelcome /> -->
    <MenuNavbar/>
    <NuxtPage />
  </div>
</template>
<style>
/* color palette used https://coolors.co/4d669d-6b6667-120e0c-9d99a0-dbdddd */
:root { 
  font-family: 'Inter',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Arial,Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';}
@supports (font-variation-settings: normal) {
  :root { font-family: 'Inter var', sans-serif; }
}
/* html{
 font-family: " Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";
} */
.container{
  @apply mx-auto max-w-5xl px-10 sm:px-0   text-[#848484];
}

.bg-light{
  background-color: #f5f5f5
 /* #f1eee8; */
 /* background: radial-gradient(86% 83.48% at -27.81% -29.39%,#e1dfff 0%,#e0ddff .01%,#fafaff 100%); */
 
}
</style>
