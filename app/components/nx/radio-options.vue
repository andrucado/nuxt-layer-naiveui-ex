<script setup lang="ts">
const props = defineProps<{
  value?: string
  options: { value: string; label: string }[]
  name?: string
  disabled?: boolean
}>()

const disabled = toRef(props, 'disabled')

const emit = defineEmits<{
  (e: 'update:value', value?: string): void
}>()

const modelValue = useVModel(props, 'value', emit)
</script>

<template lang="pug">
n-radio-group(v-model:value="modelValue", :name="name", :disabled="disabled")
  n-space
    n-radio(v-for="{ value, label } in options", :key="value", :value="value", :label="label")
</template>

<style scoped lang="scss"></style>
