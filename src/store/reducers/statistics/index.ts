const initState = {
  sData: {}
}

interface Action {
  type: string,
  data: any
}

const statisticReducers = (state = initState, action: Action) => {
  if (action.type === 'statistics') {
    return {
      ...state,
      sData: action.data
    }
  }
  return {
    ...state
  }
}

export default statisticReducers