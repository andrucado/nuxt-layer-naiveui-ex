<script setup lang="ts">
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import { AppIcon } from '#components'

const props = defineProps<{
  options: (MenuMixedOption & { iconName: string })[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const show = ref(false)

function renderIcon({ iconName }: any) {
  if (!iconName) return
  return h(AppIcon, { name: iconName, size: 16 })
}

function onUpdateValue(key?: string) {
  if (!key) return
  emit('select', key)
  show.value = false
}
</script>

<template lang="pug">
n-popover(v-model:show="show" placement="bottom-end" trigger="click" style="--n-padding: 0")
  template(#trigger)
    slot
  n-menu.nx-popmenu(@update:value="onUpdateValue", :options="options", :render-icon="renderIcon", :disabled="disabled")
</template>

<style lang="scss">
.nx-popmenu {
  --n-item-height: 24px !important;
  .n-menu-item-content {
    padding: 0px 18px 0px 12px !important;
    &::before {
      left: 6px;
      right: 6px;
    }
    .n-menu-item-content__icon {
      margin-right: 4px !important;
    }
  }
}
</style>
