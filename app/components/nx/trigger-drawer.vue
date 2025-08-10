<script setup lang="ts">
import type { DrawerProps } from 'naive-ui'

const props = withDefaults(
  defineProps<{
    options?: DrawerProps
  }>(),
  {
    options: () => ({}),
  },
)

const emit = defineEmits<{
  (e: 'trigger'): void
}>()

const slots = defineSlots<{
  content(): any
  header(): any
  footer(): any
}>()

const { show, hide } = useNxDrawers()
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

defineExpose({ hide })
</script>

<template lang="pug">
span(ref="element")
  slot
</template>
