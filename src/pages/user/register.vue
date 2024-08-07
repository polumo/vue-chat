<script setup lang="ts">
import { z } from 'zod'
import { useUserForm } from './user'
import Logo from './components/Logo.vue'
import FormField from './components/FormField.vue'
import { registerUser } from '@/api/user'
import { setToken } from '@/utils/token'

const schema = z.object({
  username: z.string({ message: '用户名不能为空' }).min(6, '用户名至少6个字符'),
  email: z.string({ message: '邮箱不能为空' }).email('请输入有效的电子邮箱地址').min(1, '邮箱不能为空'),
  password: z.string({ message: '密码不能为空' }).min(6, '至少包含6个字符'),
  confirmPassword: z.string({ message: '两次密码不一致' }).min(6, '至少包含6个字符'),
}).refine(data => data.password === data.confirmPassword, { message: '两次密码不一致', path: ['confirmPassword'] })

const { handleSubmit, resetForm, email, password, username, confirmPassword } = useUserForm(schema)

const router = useRouter()

const register = handleSubmit(async (values) => {
  const { data } = await registerUser(values)
  if (data) {
    setToken(data)
    router.push('/chat')
  }
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
      <Logo />

      <FormField :field="email" field-name="email" placeholder="邮箱" />
      <FormField :field="username" field-name="username" placeholder="用户名" />
      <FormField :field="password" field-name="password" placeholder="密码" />
      <FormField :field="confirmPassword" field-name="confirmPassword" placeholder="确认密码" />

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
