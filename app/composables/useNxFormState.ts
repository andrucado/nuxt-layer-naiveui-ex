import { shallowReactive } from 'vue'
import { createInjectionState } from '@vueuse/core'

const [useProvideNxFormState, useNxFormState] = createInjectionState(() => {
  const subForms = shallowReactive<{ onBeforeSubmit: () => Promise<unknown> }[]>([])
  return { subForms }
})

export { useProvideNxFormState, useNxFormState }
