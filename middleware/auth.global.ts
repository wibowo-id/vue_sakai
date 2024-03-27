import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();
  const runtimeConfig = useRuntimeConfig();
  console.log('user.user :', user.user)
  console.log('hiji')
  if (!user.user && to.name !== 'auth-Login') {
  console.log('hiji jeuro')
    user.setUser();
    return navigateTo('/auth/login');
  }
  console.log('dua')
  if (user.user && to.name === 'auth-Login') {
  console.log('dua jeuro')
  console.log('user.user :', user.user)
    // return navigateTo('/');
    router.push('/');
  }
  console.log('tilu')
  if (user.user) {
  console.log('tilu jeuro')
    useFetch('/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + user.user.remember_token
      },
      baseURL: runtimeConfig.public.apiBase,
      onResponse({ response }) {
        if (response._data.data) {
          user.setUserData(response._data.data)
        } else {
          user.setUser(null);
          return navigateTo('/auth/login');
        }
      },
    });
  } else {
    console.log('tidak punya token')
  }

});
