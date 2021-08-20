const initState = {
  users: [],
  isSuccess: false,
  picUrl: ''
}

interface Action {
  type: string,
  data: any,
  isSuccess: boolean
}

const userReducers = (state = initState, action: Action) => {
  switch (action.type) {
    case 'register':
      return {
        ...state,
        isSuccess: action.isSuccess
      }
    case 'login':
      return {
        ...state,
        users: action.data,
        isSuccess: action.isSuccess
      }
    case 'info':
      return {
        ...state,
        users: action.data,
        isSuccess: action.isSuccess
      }
    case 'editsignature':
      return {
        ...state,
        isSuccess: action.isSuccess
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducers