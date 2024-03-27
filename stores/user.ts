export const useUserStore = defineStore('userStore', () => {
  const user = ref()
  const userData = ref()

  function setUser (value?: any) {
    user.value = value || undefined
  }
  function setUserData (value?: any) {
    userData.value = value || undefined
  }

  function unsetUser () {
      const authCookie = useCookie('userStore')
      authCookie.value = null
  }

  return {
    user,
    setUser,
    userData,
    setUserData,
    unsetUser,
  }
},
{
  persist: true
})
