<script setup lang="ts">
import type { DiscreteApiOptions } from 'naive-ui/es/discrete/src/interface'
const props = defineProps<DiscreteApiOptions>()
</script>

<template lang="pug">
n-config-provider(v-bind="props.configProviderProps")
  n-loading-bar-provider(v-bind="props.loadingBarProviderProps")
    n-modal-provider(v-bind="props.modalProviderProps")
      n-dialog-provider(v-bind="props.dialogProviderProps")
        n-notification-provider(v-bind="props.notificationProviderProps")
          n-message-provider(v-bind="props.messageProviderProps")
            nx-popmenu-provider
            slot
</template>
