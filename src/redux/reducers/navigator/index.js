import initState from "../../state";

export const notificationReducer = (
    state = initState.navigation,
    action
  ) => {
    switch (action.type) {
      case 'NAVIGATOR_MENU':
        return {
          ...state,
          data: !!action.payload?.data?.length ? action.payload.data : state.data,
          action: action.payload.action,
          count: action.payload.reset ? 0 : action.payload.count ? state.count + 1 : state.count > 0 ? state.count - 1 : 0,
          clear: action.payload.clear,
          parentMenu: action.payload.parentMenu ? true : false,
          title: action.payload.title ?  action.payload.title : state.title,
        };
      default:
        return state;
    }
  };


  export const dialogModalReducer = (
    state = initState.dialogModal,
    action
  ) => {
    switch (action.type) {
      case 'DIALOG_MODAL':
        return {
          ...state,
          open: action.payload.open,
        };
      default:
        return state;
    }
  };
