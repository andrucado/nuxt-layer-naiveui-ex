import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
  addComponent,
  addImports,
  extendViteConfig,
} from '@nuxt/kit'
import naive from 'naive-ui'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'naiveui',
    compatibility: {
      nuxt: '>=3.16.0',
    },
  },

  // Add types for volar
  hooks: {
    'prepare:types': ({ references }) => {
      references.push({
        types: 'naive-ui/volar',
      })
    },
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    // nuxt.options.css.push(resolve('./runtime/assets/style.css'))
    addPlugin(resolve('./runtime/plugins/naiveui.server'))

    // Add imports for naive-ui components
    const naiveComponents = Object.keys(naive).filter(name => /^N[A-Z]|n-[a-z]/.test(name))
    const naiveClientOnlyComponents = ['NDrawer', 'NDrawerContent', 'NModal']

    naiveComponents.forEach(name => {
      addComponent({
        export: name,
        name,
        filePath: 'naive-ui',
        mode: naiveClientOnlyComponents.includes(name) ? 'client' : 'all',
      })
    })

    // Add imports for naive-ui composables
    const naiveComposables = [
      'useDialog',
      'useMessage',
      'useNotification',
      'useLoadingBar',
      'useDialogReactiveList',
      'useThemeVars',
      'useModal',
    ]

    naiveComposables.forEach(name => {
      addImports({
        name,
        as: name,
        from: 'naive-ui',
      })
    })

    nuxt.options.build.transpile.push('naive-ui')
    /*
    if (process.env.NODE_ENV === 'development') {
      // Fix `vueuc` imports
      nuxt.options.build.transpile.push('naive-ui')
      // Fix transpilation of `@juggle/resize-observer`

      extendViteConfig(config => {
        config.plugins ||= []
        config.plugins.push({
          name: 'fix-transpile-juggle-resize-observer',
          enforce: 'pre',
          transform(code, id) {
            if (id.includes('@juggle/resize-observer/lib/algorithms/calculateBoxSize.js')) {
              console.log('juggle transformed')
              return code.replace('global.navigator && global.navigator.userAgent', 'global.navigator?.userAgent')
            }
          },
        })
      })

    } else {
      nuxt.options.build.transpile.push('naive-ui', 'vueuc', '@css-render/vue3-ssr', '@iconify/vue')
    }*/
  },
})
