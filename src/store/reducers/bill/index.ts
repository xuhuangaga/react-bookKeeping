const initState = {
  data: [],
  totalExpense: 0,
  totalIncome: 0,
  totalPage: 0
}

interface Action {
  type: string,
  data: any,
  totalExpense: number,
  totalIncome: number,
  totalPage: number
}

const billReducers = (state = initState, action: Action) => {
  if (action.type === 'bList') {
    return {
      ...state,
      data: action.data,
      totalExpense: action.totalExpense,
      totalIncome: action.totalIncome,
      totalPage: action.totalPage
    }
  } else if (action.type === 'bDetail') {
    return {
      ...state,
      data: action.data
    }
  }
  return {
    ...state
  }
}

export default billReducers