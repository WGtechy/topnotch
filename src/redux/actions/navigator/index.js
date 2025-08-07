

export const navigatorMenu  = (item) => async (dispatchAction) => {
    dispatchAction({
      type: 'NAVIGATOR_MENU',
        payload: {
          data: item?.data,
          action: item?.action,
          title: item?.title,
          reset: item?.reset,
          clear: item?.clear,
          count: item?.count,
          parentMenu: item.parentMenu
        }
    });
}
export const dialogModal  = open => async (dispatchAction) => {
  dispatchAction({
    type: 'DIALOG_MODAL',
      payload: {
        open
      }
  });
}

