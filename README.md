# Nuxt Layer Naive UI Extensions

A Nuxt layer that extends Naive UI with additional components, composables, and utilities to enhance your Naive UI experience in Nuxt applications.

## Features

- Enhanced form components with advanced configuration options
- Popup menu system with icon support
- Drawer management system
- Route menu components
- Loading indicators
- Modal and dialog triggers
- Unified provider system
- Convenient composables for accessing UI functionality

## Installation

```bash
# npm
npm install @andrucado/nuxt-layer-naiveui-ex

# yarn
yarn add @andrucado/nuxt-layer-naiveui-ex

# pnpm
pnpm add @andrucado/nuxt-layer-naiveui-ex
```

## Setup

Add the layer to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@andrucado/nuxt-layer-naiveui-ex']
})
```

This layer already includes the following modules, so you don't need to add them separately:
- `@vueuse/nuxt`
- `@unocss/nuxt`

## Requirements

This layer has the following peer dependencies that you should install in your project:

```bash
pnpm add @bg-dev/nuxt-naiveui@2.0.0-rc.5 @iconify/vue@^5.0.0 @unocss/extractor-pug@^66.3.2 @unocss/nuxt@^66.3.2 @vueuse/components@^13.4.0 @vueuse/core@^13.4.0 @vueuse/nuxt@^13.4.0 lodash-es@^4.17.21 naive-ui@^2.42.0 pug@^3.0.3 sass@^1.89.2 unocss@^66.3.2
```

## Components

### NxForm

An enhanced form component with advanced configuration options:

```vue
<template>
  <nx-form
    v-model:value="formData"
    :fields="fields"
    :grid="true"
    @submit-intent="handleSubmit"
  />
</template>

<script setup>
const formData = ref({})
const fields = [
  {
    key: 'name',
    label: 'Name',
    component: NInput,
    rules: [{ required: true, message: 'Name is required' }]
  },
  {
    key: 'email',
    label: 'Email',
    component: NInput,
    rules: [{ required: true, message: 'Email is required' }]
  },
  // Fields can have custom rendering, validation, conditional visibility, etc.
]

async function handleSubmit() {
  try {
    const data = await $refs.form.submit()
    // Handle successful submission
  } catch (error) {
    // Handle validation errors
  }
}
</script>
```

### NxPopmenu

A popup menu component with icon support:

```vue
<template>
  <nx-popmenu :options="options" @select="handleSelect">
    <n-button>Open Menu</n-button>
  </nx-popmenu>
</template>

<script setup>
const options = [
  {
    label: 'Edit',
    key: 'edit',
    iconName: 'mdi:pencil'
  },
  {
    label: 'Delete',
    key: 'delete',
    iconName: 'mdi:delete'
  }
]

function handleSelect(key) {
  // Handle menu item selection
}
</script>
```

### NxProvider

A unified provider component that sets up all necessary providers:

```vue
<template>
  <nx-provider>
    <!-- Your app content -->
  </nx-provider>
</template>
```

### Other Components

- `NxDrawers` - Drawer management system
- `NxLoadingLine` - Loading indicator
- `NxRadioOptions` - Enhanced radio options
- `NxRouteMenu` - Menu tied to routes
- `NxToggleButtonGroup` - Group of toggle buttons
- `NxTriggerDrawer` - Trigger for drawers
- `NxTriggerModal` - Trigger for modals

## Composables

### useNxProviders

Access all UI providers in one place:

```ts
const { modal, message, dialog, notification, loadingBar, drawer } = useNxProviders()

// Show a message
message.success('Operation successful')

// Open a modal
modal.info({
  title: 'Information',
  content: 'This is some important information'
})

// Open a drawer
drawer.open({
  title: 'Drawer',
  content: () => h('div', 'Drawer content')
})
```

### Other Composables

- `useNxDrawers` - Manage drawers programmatically
- `useNxFormState` - Manage form state
- `useNxPopmenuProvider` - Manage popup menus programmatically

## Development

```bash
# Install dependencies
pnpm install

# Start development server with playground
pnpm dev

# Build the playground
pnpm build

# Generate static playground
pnpm generate

# Preview the playground
pnpm preview
```

## License

MIT


## Complete Examples

Important: Place NxProvider once near the root of your app so global features (drawers, popmenus, discrete APIs) are available.

Example (app.vue or a layout):

```vue
<template>
  <nx-provider>
    <NuxtPage />
  </nx-provider>
</template>
```

### NxForm — advanced, composable form

```vue
<script setup lang="ts">
import { NInput, NSelect, NSwitch, NButton } from 'naive-ui'

const formRef = ref<any>()

const formData = ref({
  name: '',
  email: '',
  role: undefined as string | undefined,
  subscribe: false,
  meta: { note: '' }
})

const fields = [
  {
    key: 'name',
    label: 'Name',
    component: NInput,
    rules: [{ required: true, message: 'Name is required' }],
  },
  {
    key: 'email',
    label: 'Email',
    component: NInput,
    props: { type: 'email', placeholder: 'name@example.com' },
    rules: [
      { required: true, message: 'Email is required' },
      { type: 'email', message: 'Invalid email' }
    ],
  },
  {
    key: 'role',
    label: 'Role',
    component: NSelect,
    props: { options: [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
    ]},
  },
  {
    key: 'subscribe',
    label: 'Subscribe',
    component: NSwitch,     // uses v-model:value by default
  },
  {
    key: 'meta.note',
    label: 'Note (admins only)',
    component: NInput,
    showIf: (data: any) => data.role === 'admin',
  },
  {
    key: 'password',
    label: 'Password',
    render: ({ value, update }: any) => h(NInput, { type: 'password', value, 'onUpdate:value': update }),
    serialize: (value: string) => value ? `hashed:${value}` : undefined,
  },
]

async function onSubmit() {
  try {
    const cleaned = await formRef.value.submit()
    console.log('Submit data', cleaned)
  } catch (err) {
    // Validation errors are included in err.cause
    console.error('Form validation error', err)
  }
}
</script>

<template>
  <nx-form
    ref="formRef"
    v-model:value="formData"
    :fields="fields"
    :columns="2"
    :grid="{ cols: 12, xGap: 16, yGap: 8 }"
    :form-props="{ labelPlacement: 'left' }"
    @submit-intent="onSubmit"
  />

  <n-button type="primary" @click="onSubmit">Submit</n-button>
  <pre>{{ formData }}</pre>
</template>
```

Tips
- Virtual/derived fields: mark fields as virtual: true or provide serialize/defaultValue to include computed values on submit.
- Custom components: use render(props, formData) to render arbitrary content.
- Grids and columns: Use columns and grid to control layout. column property on a field can force it into a specific column.

### NxTriggerModal — open a modal by clicking the default slot

```vue
<script setup lang="ts">
const modalRef = ref<any>()
</script>

<template>
  <nx-trigger-modal :options="{ title: 'My Modal', maskClosable: false }" ref="modalRef">
    <n-button>Open modal</n-button>
    <template #content="{ close }">
      <div style="padding: 8px;">
        <p>Modal content goes here.</p>
        <n-button @click="close()">Close</n-button>
      </div>
    </template>
  </nx-trigger-modal>
</template>
```

API notes
- Props: options?: ModalOptions
- Slots: default (trigger), content({ close })
- Emits: trigger
- Exposed: hide()

### NxTriggerDrawer — open a drawer by clicking the default slot

```vue
<script setup lang="ts">
</script>

<template>
  <nx-trigger-drawer :options="{ placement: 'right', width: 420 }">
    <n-button>Open drawer</n-button>
    <template #header>
      <div>Header</div>
    </template>
    <template #content>
      <div style="padding: 8px;">Hello from Drawer!</div>
    </template>
    <template #footer>
      <div class="flex justify-end p-2">Footer</div>
    </template>
  </nx-trigger-drawer>
</template>
```

API notes
- Props: options?: DrawerProps
- Slots: default (trigger), header, content, footer
- Emits: trigger
- Exposed: hide()

### NxDrawers — host for programmatic drawers (auto-included by NxProvider)

```vue
<script setup lang="ts">
import { NButton } from 'naive-ui'
const { show, hide } = useNxDrawers()

function openDrawer() {
  show({
    title: 'Programmatic Drawer',
    placement: 'right',
    width: 420,
    content: () => h('div', { style: 'padding: 8px' }, 'Content from composable'),
    header: () => h('div', 'Custom Header'),
    footer: () => h(NButton, { onClick: () => hide() }, { default: () => 'Close' }),
    contentProps: { closable: true },
  })
}
</script>

<template>
  <n-button @click="openDrawer">Open Programmatic Drawer</n-button>
  <!-- <nx-drawers /> is already rendered inside <nx-provider> -->
</template>
```

### NxPopmenu — anchored popup menu with icon support

```vue
<script setup lang="ts">
const options = [
  { label: 'Edit', key: 'edit', iconName: 'mdi:pencil' },
  { label: 'Delete', key: 'delete', iconName: 'mdi:delete' },
]
function onSelect(key: string) {
  console.log('Selected', key)
}
</script>

<template>
  <nx-popmenu :options="options" @select="onSelect">
    <n-button>Open Menu</n-button>
  </nx-popmenu>
</template>
```

### NxPopmenuProvider — programmatic context menu (auto-mounted by NxProvider)

```vue
<script setup lang="ts">
const { show } = useNxPopmenuProvider()

const menuOptions = [
  { label: 'Copy', key: 'copy', iconName: 'mdi:content-copy' },
  { label: 'Paste', key: 'paste', iconName: 'mdi:content-paste' },
]

function onContextMenu(e: MouseEvent) {
  e.preventDefault()
  show(
    { position: { x: e.clientX, y: e.clientY }, options: menuOptions, placement: 'bottom-start' },
    (key) => {
      console.log('Picked', key)
    }
  )
}
</script>

<template>
  <div @contextmenu="onContextMenu" style="border: 1px dashed #ccc; padding: 12px;">
    Right click here
  </div>
  <!-- <nx-popmenu-provider /> is already rendered inside <nx-provider> -->
</template>
```

### NxLoadingLine — top progress line

```vue
<script setup lang="ts">
const loading = ref(false)
const error = ref<any>(null)

async function simulate() {
  loading.value = true
  error.value = null
  try {
    await new Promise(r => setTimeout(r, 1200))
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <nx-loading-line :active="loading" :error="error" />
  <n-button @click="simulate">Run</n-button>
</template>
```

### NxRadioOptions — simple radio list

```vue
<script setup lang="ts">
const value = ref('b')
const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]
</script>

<template>
  <nx-radio-options v-model:value="value" :options="options" name="demo" />
  <div>Picked: {{ value }}</div>
</template>
```

### NxRouteMenu — route-aware side menu

```vue
<script setup lang="ts">
const options = [
  { label: 'Home', key: '/', iconName: 'mdi:home' },
  { label: 'Users', key: 'users', iconName: 'mdi:account' },
  { label: 'Settings', key: 'settings', iconName: 'mdi:cog' },
]
</script>

<template>
  <!-- When basePath is '/app', clicking 'users' navigates to '/app/users' -->
  <nx-route-menu :options="options" :collapsed="false" basePath="/" />
</template>
```

### NxToggleButtonGroup — segmented toggle with icons

```vue
<script setup lang="ts">
const current = ref<string>('list')
const buttons = [
  { key: 'list', label: 'List', icon: 'mdi:view-list' },
  { key: 'grid', label: 'Grid', icon: 'mdi:view-grid' },
  { key: 'stats', label: 'Stats', icon: 'mdi:chart-bar' },
]
</script>

<template>
  <nx-toggle-button-group v-model:value="current" :buttons="buttons" :icon-only="false" size="small" />
  <div>Mode: {{ current }}</div>
</template>
```

## Composables — complete usage

### useNxProviders — unified access to Naive UI discrete APIs + drawers

```ts
const { message, modal, dialog, notification, loadingBar, drawer } = useNxProviders()

message.success('Saved!')

const modalInst = modal.create({
  preset: 'card',
  title: 'Hello',
  content: () => 'Hi there!',
})

loadingBar.start()
setTimeout(() => loadingBar.finish(), 800)

// Programmatic drawer via the same entry
await drawer.show({
  width: 360,
  placement: 'right',
  title: 'Quick Panel',
  content: () => h('div', 'Some content'),
})
```

### useNxDrawers — programmatic drawers

```ts
const { show, hide, drawers } = useNxDrawers()

show({
  placement: 'right',
  width: 420,
  content: () => h('div', { style: 'padding: 10px' }, 'Drawer body'),
  header: () => h('div', 'Header'),
  footer: () => h('div', 'Footer'),
})

// Hide latest drawer
hide()
// Or hide by index or id
// hide(0) or hide('drawer-id')
```

### useNxPopmenuProvider — programmatic context menu

```ts
const { show, hide, onSelect } = useNxPopmenuProvider()

onSelect((key) => {
  console.log('Selected', key)
})

function openAt(x: number, y: number) {
  show({
    position: { x, y },
    placement: 'bottom-start',
    options: [
      { label: 'Cut', key: 'cut', iconName: 'mdi:content-cut' },
      { label: 'Copy', key: 'copy', iconName: 'mdi:content-copy' },
    ],
  }, (key) => console.log('pick', key))
}
```

### useNxFormState — coordinate sub-forms before submit

```vue
<script setup lang="ts">
// Inside a child component rendered somewhere inside <nx-form>
const state = useNxFormState()

onMounted(() => {
  if (!state) return
  const item = { onBeforeSubmit: async () => {
    // perform async work before the parent form validates/submits
    await new Promise(r => setTimeout(r, 50))
  }}
  state.subForms.push(item)
  onBeforeUnmount(() => {
    const i = state.subForms.indexOf(item)
    if (i >= 0) state.subForms.splice(i, 1)
  })
})
</script>
```

Notes
- NxForm automatically calls all registered subForms.onBeforeSubmit() before validating and serializing data.

```
