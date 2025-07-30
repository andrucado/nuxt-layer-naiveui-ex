<script setup lang="ts">
const { show } = useNxPopmenuProvider()

const options = [
  {
    key: 'name',
    label: 'name',
  },
]
function clickShow(e: MouseEvent) {
  show({
    position: { x: e.x, y: e.y },
    options,
  })
}

const showMe = ref(false)
function onClickOutside() {
  showMe.value = false
}
</script>

<template lang="pug">
nx-provider
  n-button(@click="clickShow") show abs

  nx-popmenu(:options)
    n-button PopMenu

  n-popover(trigger="click")
    template(#trigger)
      n-button Hello
    div Content
</template>
