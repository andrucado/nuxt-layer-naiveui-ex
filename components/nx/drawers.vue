<script setup lang="ts">
import { watchArray } from '@vueuse/core'

const { drawers } = useNxDrawers()

watchArray(
  drawers,
  (_, __, added) => {
    nextTick(() => {
      added.forEach(x => {
        x.show = true
      })
    })
  },
  { deep: true, immediate: true },
)

function onUpdateShow(drawer: any, show: boolean) {
  if (!show) {
    const arr = drawers.value
    const index = arr.indexOf(drawer)

    setTimeout(() => {
      arr.splice(index, 1)
    }, 250)
  }
}
</script>

<template lang="pug">
template(v-for="drawer in drawers")
  n-drawer(
    v-model:show="drawer.show"
    @update:show="onUpdateShow(drawer, $event)",
    :width="drawer?.width",
    :style="drawer?.style",
    :placement="drawer?.placement || 'right'"
  )
    n-drawer-content(:title="drawer?.title")
      template(v-if="drawer.header" v-slot:header)
        component(:is="drawer.header")
      template(v-if="drawer.footer" v-slot:footer)
        component(:is="drawer.footer")
      component(:is="drawer.content")
</template>

<style scoped lang="scss"></style>
