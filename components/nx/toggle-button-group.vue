<script setup lang="ts">
import { Icon } from '@iconify/vue'

export type NxToggleButtonProps = {
  key: string
  label: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    value?: string
    buttons: NxToggleButtonProps[]
    iconOnly?: boolean
    tooltipDelay?: number
    defaultNone?: boolean
    size?: 'tiny' | 'small' | 'medium' | 'large'
  }>(),
  {
    tooltipDelay: 1000,
  },
)

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const value = useVModel(props, 'value', emit)

watch(
  [() => props.buttons, () => props.defaultNone],
  ([buttons, defaultNone]) => {
    if (!defaultNone && buttons.length > 0 && value.value === undefined) {
      value.value = buttons[0].key
    }
  },
  { immediate: true },
)

function onClickButton(key: string) {
  value.value = key
}
</script>

<template lang="pug">
n-button-group(:size)
  template(v-for="{ key, label, icon } in buttons", :key)
    n-tooltip(:delay="tooltipDelay")
      template(#trigger)
        n-button(:type="key === value ? 'primary' : undefined" @click="onClickButton(key)")
          .flex.gap-1.items-center
            icon(v-if="icon", :icon)
            div(v-if="!iconOnly") {{ label }}
      div {{ label }}
</template>

<style scoped lang="scss"></style>
