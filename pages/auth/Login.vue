<script lang="ts" setup>
import { useLayout } from '@/layouts/composables/layout';
import { reactive, ref, computed } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useUserStore } from '~/stores/user';
import { useToast } from "primevue/usetoast";
const toast = useToast();
const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();
const { layoutConfig } = useLayout();
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Email/Telepon harus diisi', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password harus diisi', trigger: 'blur' },
  ],
})

const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
    email: ref(''),
    password: ref(''),
    checked: ref(false),
});

definePageMeta({
    layout: false
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  // formEl.validate((valid) => {
  //   if (valid) {
      useFetch('auth/login',
        {
          method: 'POST',
          body: {
            email: loginForm.email,
            password: loginForm.password
          },
            headers: {'IsWeb': true},
          baseURL: runtimeConfig.public.apiBase,
          onResponse({ response }) {
            if (response._data.message.includes('incorrect')) {
              isError.value = true
            }
            if (response._data.data) {
                toast.add({ severity: 'success', summary: 'Success', detail: 'Login Success !', life: 3000 });
              userStore.setUser(response._data.data);
              navigateTo('/');
            }
          }
        }
      );
  //   } else {
  //     return false;
  //   }
  // });
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <Toast />
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <form ref="loginFormRef" :model="loginForm"
      :rules="rules">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="loginForm.email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="loginForm.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="loginForm.checked" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="submitForm(loginFormRef)"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}
.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
