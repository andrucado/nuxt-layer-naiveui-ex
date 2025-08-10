<script setup lang="ts">
import type { ModalReactive, ModalOptions } from 'naive-ui'
import { cloneDeep, defaults } from 'lodash-es'

const { modal } = useNxProviders()!

const props = withDefaults(
  defineProps<{
    options?: ModalOptions
  }>(),
  {
    options: () => ({}),
  },
)

const emit = defineEmits<{
  (e: 'trigger'): void
}>()

const slots = defineSlots<{
  content(params: { close: () => void }): any
}>()

const element = shallowRef<HTMLElement>()
let modalInstance: ModalReactive | undefined

function show() {
  modalInstance = modal.create(
    defaults(cloneDeep(props.options), {
      show: true,
      preset: 'card',
      content: () =>
        slots.content({
          close: () => {
            modalInstance?.destroy()
          },
        }),
    }),
  )
}

useEventListener(element, 'click', e => {
  show()
  emit('trigger')
})

tryOnUnmounted(() => {
  modalInstance = undefined
})

defineExpose({
  hide: () => {
    modalInstance?.destroy()
    modalInstance = undefined
  },
})
</script>

<template lang="pug">
span(ref="element")
  slot
</template>
