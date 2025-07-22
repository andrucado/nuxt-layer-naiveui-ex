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
- `@bg-dev/nuxt-naiveui`
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
