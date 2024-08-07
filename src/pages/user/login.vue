<script setup lang="ts">
import { z } from 'zod'
import { useUserForm } from './user'
import FormField from './components/FormField.vue'
import Logo from './components/Logo.vue'
import { loginUser } from '@/api/user'
import { setToken } from '@/utils/token'

const schema = z.object({
  email: z.string({ message: '邮箱不能为空' }).email('请输入有效的电子邮箱地址').min(1, '邮箱不能为空'),
  password: z.string({ message: '密码不能为空' }).min(6, '至少包含6个字符'),
})

const { handleSubmit, resetForm, email, password } = useUserForm(schema)

const router = useRouter()

const login = handleSubmit(async (values) => {
  const { data } = await loginUser(values)

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
      <FormField :field="password" field-name="password" placeholder="密码" />

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
        <RouterLink to="/user/register" class="text-#53cd9b" cursor="pointer">
          去注册
        </RouterLink>
      </p>
    </form>
  </div>
</template>
