<script setup lang="ts">
const { drawers, hide } = useNxDrawers()
</script>

<template lang="pug">
template(v-for="drawer in drawers")
  n-drawer(v-bind="drawer" v-model:show="drawer.show" @update:show="hide(drawer)")
    n-drawer-content(v-bind="drawer.contentProps")
      template(v-if="drawer.header" v-slot:header)
        component(:is="drawer.header")
      template(v-if="drawer.footer" v-slot:footer)
        component(:is="drawer.footer")
      component(:is="drawer.content")
</template>
