export const useLayoutStore = defineStore('layoutStore', () => {
  const isCollapse = ref(false)

  function setCollapse (value: boolean) {
    isCollapse.value = value
  }

  return {
    isCollapse,
    setCollapse,
  }
},
{
  persist: true
})
