<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

</script>

<template>
    <app-layout></app-layout>
</template>
