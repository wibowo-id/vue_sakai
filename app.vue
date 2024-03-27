<script setup>
const title = ref('Nash App')
const description = ref('Nash App Description')
useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap'
    }
  ]
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style lang="scss"></style>
