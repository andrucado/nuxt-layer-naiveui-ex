import { createInjectionState } from '@vueuse/core'
import { createDiscreteApi } from 'naive-ui'
import type { DiscreteApiOptions } from 'naive-ui'

const [useNxProvidersTopLevel, useNxProviders] = createInjectionState((options: DiscreteApiOptions) => {
  return {
    ...createDiscreteApi(['modal', 'message', 'dialog', 'notification', 'loadingBar'], options),
    drawer: useNxDrawers(),
  }
})

export { useNxProvidersTopLevel, useNxProviders }
