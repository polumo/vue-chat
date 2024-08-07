<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { type BaseFieldProps, ErrorMessage, Field, type GenericObject } from 'vee-validate'

const props = defineProps<{
  field: { value: globalThis.Ref<any>, attr: globalThis.Ref<BaseFieldProps & GenericObject> }
  fieldName: string
  placeholder: string
}>()

// 单向数据流
const modelValue = useVModel(props.field.value)
</script>

<template>
  <div w="full">
    <Field
      v-model="modelValue"
      :email-attrs="field.attr"
      :name="fieldName"
      :placeholder="placeholder"
      class="w-full p-2 rounded-1 text-white !bg-transparent border border-solid border-[rgb(56,72,93)]"
    />
    <ErrorMessage :name="fieldName" text="red" />
  </div>
</template>
