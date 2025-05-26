import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import type { FollowerPlacement } from 'vueuc'

export type NxPopmenuShow = {
  options: (MenuMixedOption & { iconName?: string })[]
  position: { x: number; y: number }
  placement?: FollowerPlacement
}

export const useNxPopmenuProvider = createGlobalState(() => {
  const eventSelect = useEventBus<string>('select')

  const current = ref<NxPopmenuShow & { show: boolean }>()
  let timeout: NodeJS.Timeout | undefined = undefined
  let lastOnSelectListener: ((key: string) => void) | undefined = undefined

  async function show(params: NxPopmenuShow, callback: (key: string) => void) {
    const hadTimeout = !!timeout
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    current.value = { ...params, show: hadTimeout }
    if (lastOnSelectListener) {
      if (lastOnSelectListener !== callback) {
        eventSelect.off(lastOnSelectListener)
      }
    }
    if (lastOnSelectListener !== callback) {
      eventSelect.on(callback)
    }
    lastOnSelectListener = callback
  }

  function hide() {
    const item = current.value
    if (!item) return

    item.show = false
    timeout = setTimeout(() => {
      current.value = undefined
    }, 250)
  }

  eventSelect.on(hide)

  return { current, show, hide, onSelect: eventSelect.on, emitSelect: eventSelect.emit }
})
