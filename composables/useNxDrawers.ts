export type NxDrawerShowParams = {
  content: any
  title?: string
  width?: string | number
  placement?: string
  header?: any
  footer?: any
  style?: string
}

type NxDrawerItem = NxDrawerShowParams & { show?: boolean }

export function useNxDrawers() {
  const drawers = ref<NxDrawerItem[]>([])

  async function show(params: NxDrawerShowParams) {
    const arr = drawers.value
    const item: NxDrawerItem = { ...params, show: false }
    arr.push(item)
  }

  function hide(index?: number) {
    const arr = drawers.value
    const i = index || arr.length - 1
    if (i < 0 && i >= arr.length) return

    const item = arr[i]
    item.show = false

    setTimeout(() => {
      if (item === arr[i]) {
        arr.splice(i, 1)
      }
    }, 250)
  }

  return { drawers, show, hide }
}
