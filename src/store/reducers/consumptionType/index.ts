const initState = {
  tData: []
}

interface Action {
  type: string,
  data: any
}

const consumptionTypeReducers = (state = initState, action: Action) => {
  if (action.type === 'tList') {
    return {
      ...state,
      tData: action.data
    }
  }
  return {
    ...state
  }
}

export default consumptionTypeReducers