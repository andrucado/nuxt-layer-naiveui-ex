<script setup lang="ts">
import { NForm, NGrid, NFormItem, NFormItemGridItem } from 'naive-ui'
import { isBoolean } from 'is-what'
import type { FormInst, FormItemRule, GridProps } from 'naive-ui'
import { type ComponentInstance, computed, ref, toRef } from 'vue'
import { cloneDeep, fromPairs, get, set, isFunction, omit, defaults, merge, groupBy } from 'lodash-es'
import { onKeyPressed, useActiveElement, useFocusWithin, useVModel } from '@vueuse/core'

export type NxFormField = {
  key: string
  label?: string
  render?: (props: { value: any; update: (newValue: any) => void }, formData: any) => VNode
  renderLabel?: (value: any, formData: any) => VNode
  rules?: FormItemRule | FormItemRule[]
  noLabel?: boolean
  showIf?: (formData: any) => boolean
  component?: any
  props?: Record<string, any> | ((formData: any, value: any) => any)
  valueKey?: string
  virtual?: boolean
  initialValue?: (value: any, formData: any) => any
  defaultValue?: (data: any) => any
  transform?: (value: any) => any
  serialize?: (value: any, formData: Record<string, any>) => any
  gridSpan?: number
  gridOffset?: number
  column?: number
}

export type NxFormProps = {
  value?: Record<string, any>
  fields: NxFormField[]
  grid?: GridProps | boolean
  formProps?: any
  disabled?: boolean
  gap?: string
  columns?: number
  columnGridTemplate?: string
  columnGap?: string
  columnStyles?: (Record<string, any> | string)[]
}

const props = withDefaults(defineProps<NxFormProps>(), {
  value: () => ({}),
  gap: '.75em',
  columns: 1,
  columnGridTemplate: '1fr',
})

const disabled = toRef(props, 'disabled')

const emit = defineEmits<{
  (e: 'update:value', value?: Record<string, any>): void
  (e: 'submit-intent'): void
}>()

const formRef = ref<ComponentInstance<any> & FormInst>()

const formData = useVModel(props, 'value', emit, { clone: true, deep: true })
const rules = computed(() => fromPairs(props.fields.filter(v => !!v.rules).map(v => [v.key, v.rules])))

function getFieldValue(field: any) {
  return get(formData.value, field.key)
}

const lastErrors = ref<any[]>()

const errorFieldKeys = computed(() => {
  return new Set<string>(unref(lastErrors)?.flatMap((x: any) => x.map(y => y.field)) || [])
})

const computedFormData = computed(() => {
  const data = {}
  const _fieldValues = fieldValue.value
  if (!_fieldValues) return data
  for (const [key, value] of Object.entries(_fieldValues)) {
    set(data, key, value)
  }
  return data
})

const fieldHasFeedback = computed(() => {
  const _errorFieldKeys = errorFieldKeys.value
  return Object.fromEntries(props.fields.map(({ key }) => [key, _errorFieldKeys.has(key)]))
})

const fieldVisibility = computed(() => {
  const _data = computedFormData.value
  return Object.fromEntries(props.fields.map(({ key, showIf }) => [key, isFunction(showIf) ? showIf(_data) : true]))
})

let initial = true
const fieldValue = computed(() => {
  const _data = formData.value
  const result = Object.fromEntries(
    props.fields.map(({ key, initialValue }) => {
      let value = get(_data, key)
      if (initial && initialValue) {
        value = initialValue(value, _data)
      }
      return [key, value]
    }),
  )
  if (_data) {
    // only stop when formData has an object
    initial = false
  }
  return result
})

const fieldVNodes = computed(() => {
  const _mainFormData = formData.value
  const _data = computedFormData.value
  const _fieldValues = fieldValue.value
  return Object.fromEntries(
    props.fields.map(({ key, render, component, props, valueKey, transform }) => {
      valueKey ??= 'value'
      const value = transform ? transform(_fieldValues[key]) : _fieldValues[key]
      const renderProps = {
        ...(isFunction(props) ? props(_mainFormData, value) : props),
        [valueKey]: value,
        [`onUpdate:${valueKey}`]: value => {
          const newData = cloneDeep(_data)
          set(newData, key, value)
          emit('update:value', newData)
        },
      }
      if (unref(disabled)) {
        renderProps.disabled = true
      }
      return [key, render ? render(renderProps, _data) : component ? h(component, renderProps) : undefined]
    }),
  )
})

const columnFields = computed(() => {
  return groupBy(props.fields, ({ column }) => column ?? 0)
})

const columnGridGap = computed(() => props.columnGap ?? props.gap)

const { subForms } = useProvideNxFormState()

defineExpose({
  formData,
  validate: async () => {
    return new Promise<void>((resolve, reject) => {
      const _form = formRef.value
      if (!_form) {
        return reject()
      }
      _form?.validate((errors?: any[]) => {
        if (errors && errors.length > 0) {
          lastErrors.value = errors
          reject(errors)
          return
        }
        resolve()
      })
    })
  },
  submit: async () => {
    const _form = formRef.value
    if (!_form) {
      return
    }

    for (const subForm of subForms) {
      await subForm.onBeforeSubmit()
    }
    await nextTick()

    let _formData = cloneDeep(unref(formData))
    lastErrors.value = undefined

    const omitKeys = props.fields.filter(x => x.virtual || (x.showIf && !x.showIf(_formData))).map(x => x.key)
    if (omitKeys.length > 0) {
      _formData = omit(_formData, omitKeys)
    }

    const defaultValues = props.fields
      .filter(x => x.defaultValue)
      .map(({ key, defaultValue }) => ({ key, value: defaultValue?.(_formData) }))

    if (defaultValues.length > 0) {
      const defaultObject: Record<string, any> = {}
      for (const { key, value } of defaultValues) {
        set(defaultObject, key, value)
      }
      _formData = defaults(_formData, defaultObject)
    }

    const customValues = props.fields
      .filter(x => x.serialize)
      .map(({ key, serialize }) => ({ key, value: serialize?.(get(_formData, key), _formData) }))

    if (customValues.length > 0) {
      const customObject: Record<string, any> = {}
      for (const { key, value } of customValues) {
        set(customObject, key, value)
      }
      _formData = merge(_formData, customObject)
    }

    return new Promise((resolve, reject) => {
      _form?.validate((errors?: any[]) => {
        if (!errors || errors.length === 0) {
          resolve(_formData)
        }
        lastErrors.value = errors
        reject(new Error('Form Error', { cause: errors }))
      })
    })
  },
})

const { focused } = useFocusWithin(computed(() => unref(formRef)?.$el))
const selectedElement = useActiveElement()
const canEnter = computed(() => unref(focused) && unref(selectedElement) && unref(selectedElement) !== document.body)

onKeyPressed('Enter', ({ shiftKey }) => {
  if (!unref(canEnter)) return
  if (unref(selectedElement)?.tagName.toLowerCase() === 'textarea' && !shiftKey) return
  emit('submit-intent')
})

// provide('formDisabled', disabled)
</script>

<template lang="pug">
n-form(ref="formRef" v-bind="formProps", :model="formData", :rules="rules", :disabled="disabled")
  .nx-form-container
    template(v-for="column in (columns || 1)")
      component(
        :is="!!grid ? NGrid : 'div'"
        v-bind="grid && !isBoolean(grid) ? grid : {}",
        :class="{ 'nx-form-column': !grid, [`nx-form-column-${column - 1}`]: !grid, 'nx-form-grid': grid }",
        :style="columnStyles ? columnStyles[column - 1] : undefined"
      )
        template(v-for="field in columnFields[column - 1]")
          component(
            :is="!!grid ? NFormItemGridItem : NFormItem"
            v-if="!!fieldVisibility[field.key]",
            :label="field.label",
            :path="field.key",
            :show-label="!!field.label && !field.noLabel",
            :show-feedback="!!fieldHasFeedback[field.key]",
            :label-style="formProps?.labelStyle"
            style="--n-label-padding: 0px; --n-label-height: 22px; --n-blank-height: initial; letter-spacing: -0.5px",
            :span="!!grid ? field.gridSpan : undefined",
            :offset="!!grid ? field.gridOffset : undefined"
          )
            template(v-if="field.renderLabel && !field.noLabel" v-slot:label)
              component(:is="field.renderLabel(fieldValue[field.key], formData)", :disabled="disabled")
            component(:is="fieldVNodes[field.key]")
</template>

<style scoped lang="scss">
:deep(.nx-form-column) {
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
}

.nx-form-container {
  display: grid;
  grid-template-columns: v-bind(columnGridTemplate);
  grid-gap: v-bind(columnGridGap);
}
</style>
