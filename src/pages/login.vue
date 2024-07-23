<script setup lang="ts">
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { loginUser } from '@/api/user'

const schema = toTypedSchema(
  z.object({
    email: z.string({ message: '邮箱不能为空' }).email('请输入有效的电子邮箱地址').min(1, '邮箱不能为空'),
    password: z.string({ message: '密码不能为空' }).min(6, '至少包含6个字符'),
  }),
)

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const login = handleSubmit(async (values) => {
  const { data } = await loginUser(values)
  console.log(data)
})
</script>

<template>
  <div wh="screen" bg="#131324" f="c-c">
    <form
      w="40vw"
      min-w="420px"
      max-w="520px"
      bg="#0a0a14"
      rounded="8"
      p="x-20 y-12"
      flex="~ col items-center"
      gap="8"
    >
      <div f="c-c" gap="4">
        <img src="/src/assets/logo.png" alt="Logo" w="20" object="contain">
        <h1 uppercase text="8 white">
          vuechat
        </h1>
      </div>

      <div w="full">
        <Field
          v-model="email"
          :email-attrs
          name="email"
          placeholder="邮箱"
          class="w-full p-2 rounded-1 text-white !bg-transparent border border-solid border-[rgb(56,72,93)]"
        />
        <ErrorMessage name="email" text="red" />
      </div>
      <div w="full">
        <Field
          v-model="password"
          :password-attrs
          name="password"
          type="password"
          placeholder="密码"
          class="w-full p-2 rounded-1 text-white bg-transparent border border-solid border-[rgb(56,72,93)]"
        />
        <ErrorMessage name="password" text="red" />
      </div>

      <div w="full" grid="~ cols-2">
        <Button
          type="button"
          pt:root="mx-2 py-2 bg-[rgb(56,72,93)] text-white text-3 font-bold rounded-xl"
          @click="login"
        >
          登录
        </Button>
        <Button
          type="button"
          pt:root="mx-2 py-2 bg-[rgb(56,72,93)] text-white text-3 font-bold rounded-xl"
          @click="resetForm()"
        >
          重置
        </Button>
      </div>

      <p text="white">
        没有账号？
        <RouterLink to="/register" class="text-#53cd9b" cursor="pointer">
          去注册
        </RouterLink>
      </p>
    </form>
  </div>
</template>
