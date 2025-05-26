<script setup lang="ts">
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import type { FollowerPlacement } from 'vueuc'
import { Icon } from '@iconify/vue'

export type NxPopmenuProps = {
  options: (MenuMixedOption & { iconName?: string })[]
  position?: { x: number; y: number }
  placement?: FollowerPlacement
  disabled?: boolean
}

const props = defineProps<NxPopmenuProps>()

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const show = ref(false)

function renderIcon({ iconName }: any) {
  if (!iconName) return
  return h(Icon, { icon: iconName, width: 16, height: 16 })
}

function onUpdateValue(key?: string) {
  if (!key) return
  emit('select', key)
  show.value = false
}
</script>

<template lang="pug">
n-popover(
  v-model:show="show",
  :placement="placement ?? 'bottom-end'",
  :trigger="position ? 'click' : 'manual'",
  :x="position?.x ? position.x : undefined",
  :y="position?.y ? position.y : undefined"
  style="--n-padding: 0",
  :disabled="disabled"
)
  template(v-if="$slots.default" v-slot:trigger)
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
