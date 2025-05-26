<script setup lang="ts">
const { show } = useNxPopmenuProvider()

function clickShow(e: MouseEvent) {
  show({
    position: { x: e.x, y: e.y },
    options: [
      {
        key: 'name',
        label: 'name',
      },
    ],
  })
}

const showMe = ref(false)
function onClickOutside() {
  showMe.value = false
}
</script>

<template lang="pug">
div
  nx-popmenu-provider
  n-button(@click="clickShow") show abs
</template>
