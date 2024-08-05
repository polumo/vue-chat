<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'
import { z } from 'zod'
import { useUserForm } from './user'
import { registerUser } from '@/api/user'

const schema = z.object({
  username: z.string({ message: '用户名不能为空' }).min(6, '用户名至少6个字符'),
  email: z.string({ message: '邮箱不能为空' }).email('请输入有效的电子邮箱地址').min(1, '邮箱不能为空'),
  password: z.string({ message: '密码不能为空' }).min(6, '至少包含6个字符'),
  confirmPassword: z.string({ message: '两次密码不一致' }).min(6, '至少包含6个字符'),
}).refine(data => data.password === data.confirmPassword, { message: '两次密码不一致', path: ['confirmPassword'] })

const { handleSubmit, resetForm, email, password, username, confirmPassword } = useUserForm(schema)

const register = handleSubmit(async (values) => {
  const { data } = await registerUser(values)
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
          v-model="email.value"
          :email-attrs="email.attr"
          name="email"
          placeholder="邮箱"
          class="w-full p-2 rounded-1 text-white !bg-transparent border border-solid border-[rgb(56,72,93)]"
        />
        <ErrorMessage name="email" text="red" />
      </div>
      <div w="full">
        <Field
          v-model="username.value"
          :username-attrs="username.attr"
          name="username"
          placeholder="用户名"
          class="w-full p-2 rounded-1 text-white bg-transparent border border-solid border-[rgb(56,72,93)]"
        />
        <ErrorMessage name="username" text="red" />
      </div>
      <div w="full">
        <Field
          v-model="password.value.value"
          :password-attrs="password.attr"
          name="password"
          type="password"
          placeholder="密码"
          class="w-full p-2 rounded-1 text-white bg-transparent border border-solid border-[rgb(56,72,93)]"
        />
        <ErrorMessage name="password" text="red" />
      </div>
      <div w="full">
        <Field
          v-model="confirmPassword.value.value"
          :confirm-password-attr="confirmPassword.attr"
          name="confirmPassword"
          type="password"
          placeholder="确认密码"
          class="w-full p-2 rounded-1 text-white bg-transparent border border-solid border-[rgb(56,72,93)]"
        />
        <ErrorMessage name="confirmPassword" text="red" />
      </div>

      <div w="full" grid="~ cols-2">
        <Button
          type="button"
          pt:root="mx-2 py-2 bg-[rgb(56,72,93)] text-white text-3 font-bold rounded-xl"
          @click="register"
        >
          注册
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
        已有账号？
        <RouterLink to="/user/login" class="text-#53cd9b" cursor="pointer">
          去登录
        </RouterLink>
      </p>
    </form>
  </div>
</template>
