<script setup lang="ts">
import { NInput } from '#components'
import type { NxFormField } from '../app/components/nx/form.vue'
const { show } = useNxPopmenuProvider()

const options = [
  {
    key: 'name',
    label: 'name',
  },
]
function clickShow(e: MouseEvent) {
  show({
    position: { x: e.x, y: e.y },
    options,
  })
}

const showMe = ref(false)
function onClickOutside() {
  showMe.value = false
}

const fields: NxFormField[] = [
  {
    key: 'name',
    label: 'Name',
    render: props => {
      return h(NInput, { ...props })
    },
    rules: { required: true },
  },
  {
    key: 'type',
    label: 'Type',
    component: NInput,
    props: {
      type: 'textarea',
      rows: 5,
    },
    rules: { required: true },
  },
]

const form = shallowRef()
const formData = ref({})

async function clickSubmit() {
  console.log('submitting')
  const value = await unref(form).submit()
  console.log(value)
}
</script>

<template lang="pug">
nx-provider
  n-button(@click="clickShow") show abs

  nx-popmenu(:options)
    n-button PopMenu

  n-popover(trigger="click")
    template(#trigger)
      n-button Hello
    div Content

  div {{ formData }}
  nx-form(ref="form" v-model:value="formData", :fields="fields")
  n-button(@click="clickSubmit") Submit
</template>
