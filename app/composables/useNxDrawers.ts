import type { DrawerProps, DrawerContentProps } from 'naive-ui'
import { v4 as uuid } from 'uuid'
import { isNumber, isString } from 'is-what'
import type { HTMLAttributes } from 'vue'

type NxDrawerItem = DrawerProps &
  HTMLAttributes & {
    content: () => VNode
    header?: () => VNode
    footer?: () => VNode
    contentProps?: DrawerContentProps & HTMLAttributes
    drawerId: string
  }

export const useNxDrawers = createGlobalState(() => {
  const drawers = ref<NxDrawerItem[]>([])

  async function show(params: Omit<NxDrawerItem, 'drawerId' | 'show'>) {
    const arr = drawers.value
    const item = { ...params, drawerId: uuid(), show: false }
    arr.push(item)
  }

  function hide(index?: NxDrawerItem | string | number) {
    const arr = drawers.value

    let item: NxDrawerItem | undefined

    if (isNumber(index)) {
      const i = index || arr.length - 1
      if (i < 0 && i >= arr.length) return
      item = arr[i]
    } else if (isString(index)) {
      item = arr.find(x => x.drawerId === index)
    } else if (!index) {
      item = arr[arr.length - 1]
    } else if (arr.includes(index)) {
      item = index
    }

    if (!item) return
    const itemIndex = arr.indexOf(item)
    item.show = false

    setTimeout(() => {
      if (item === arr[itemIndex]) {
        arr.splice(itemIndex, 1)
      }
    }, 250)
  }

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

  return { drawers, show, hide }
})
