export const useNxProviders = createGlobalState(() => {
  return {
    modal: useModal(),
    message: useMessage(),
    dialog: useDialog(),
    notification: useNotification(),
    loadingBar: useLoadingBar(),
    drawer: useNxDrawers(),
  }
})
