<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'

const props = defineProps<{
  options: (MenuMixedOption & { key: string; iconName?: string })[]
  collapsed?: boolean
  basePath?: string
}>()

function renderIcon({ iconName }: any) {
  if (!iconName) return
  return h(Icon, { icon: iconName, size: 28 })
}

const router = useRouter()
const routePath = computed({
  get: () => router.currentRoute.value?.path,
  set: value => router.push(value),
})

const basePath = computed(() => {
  const _basePath = props.basePath ?? '/'
  if (_basePath === '/') return '/'
  return (
    '/' +
    _basePath
      .split('/')
      .filter(x => !!x)
      .join('/')
  )
})

const selectedMenuKey = computed(() => {
  const _path = routePath.value
  if (!_path) return
  if (_path === '/') return '/'
  return props.options.find(x => {
    if (!x.key) return false
    if (x.key === '/') return false
    const item = x.key.startsWith('/') ? x.key : '/' + x.key
    return routePath.value?.startsWith(basePath.value + item)
  })?.key
})

function onSelectMenu(item: any) {
  item = item.startsWith('/') ? item : '/' + item
  routePath.value = basePath.value + item
}
</script>

<template lang="pug">
n-menu.nx-route-menu(
  :value="selectedMenuKey"
  @update:value="onSelectMenu",
  :options,
  :collapsed,
  :collapsed-width="64",
  :collapsed-icon-size="18",
  :render-icon="renderIcon"
)
</template>

<style scoped lang="scss"></style>
