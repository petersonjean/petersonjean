<script lang="ts" setup>
const route = useRoute();
</script>
<template>
    <div class="container mx-auto px-4"> 
        <h1 class="text-3xl font-bold underline">Welcome</h1>
        {{ route.params.slug }}
    </div>
</template>