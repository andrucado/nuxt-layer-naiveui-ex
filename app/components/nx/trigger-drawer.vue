<script setup lang="ts">
const props = defineProps<{
  options: NxDrawerShowParams
}>()

const emit = defineEmits<{
  (e: 'trigger'): void
}>()

const slots = defineSlots<{
  content(): any
  header(): any
  footer(): any
}>()

const { show } = useNxDrawers()
const element = shallowRef<HTMLElement>()

useEventListener(element, 'click', () => {
  show({
    ...props.options,
    content: () => slots.content(),
    header: slots.header ? () => slots.header() : undefined,
    footer: slots.footer ? () => slots.footer() : undefined,
  })
  emit('trigger')
})
</script>

<template lang="pug">
span(ref="element")
  slot
</template>
