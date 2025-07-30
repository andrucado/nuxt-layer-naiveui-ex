<script setup lang="ts">
const props = defineProps<{
  active?: boolean
  error?: any
}>()
</script>

<template lang="pug">
n-progress(
  rail-style="--n-fill-color: red;",
  :status="error ? 'error' : 'success'",
  :height="3",
  :border-radius="0",
  :processing="!error",
  :percentage="active || error ? 100 : 0",
  :show-indicator="false"
)
</template>

<style scoped lang="scss"></style>
