<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { current, hide, emitSelect } = useNxPopmenuProvider()

whenever(
  current,
  current => {
    current.show = true
  },
  { immediate: true },
)

function renderIcon({ iconName }: any) {
  if (!iconName) return
  return h(Icon, { icon: iconName, width: 16, height: 16 })
}
</script>

<template lang="pug">
n-popover(
  v-if="current"
  v-bind:show="current.show"
  @clickoutside="hide(index)"
  trigger="manual",
  :x="current.position.x",
  :y="current.position.y"
  style="--n-padding: 0",
  :placement="current.placement"
)
  n-menu.nx-popmenu(@update:value="emitSelect($event)", :options="current.options", :render-icon="renderIcon")
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
