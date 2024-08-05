import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { ZodSchema } from 'zod'

export const useUserForm = (zodSchema: ZodSchema) => {
  const schema = toTypedSchema(zodSchema)

  const { handleSubmit, resetForm, defineField } = useForm({
    validationSchema: schema,
  })

  const [value1, attr1] = defineField('email')
  const [value2, attr2] = defineField('username')
  const [value3, attr3] = defineField('password')
  const [value4, attr4] = defineField('confirmPassword')

  const email = { value: value1, attr: attr1 }
  const username = { value: value2, attr: attr2 }
  const password = { value: value3, attr: attr3 }
  const confirmPassword = { value: value4, attr: attr4 }

  return {
    handleSubmit,
    resetForm,
    email,
    username,
    password,
    confirmPassword,
  }
}
