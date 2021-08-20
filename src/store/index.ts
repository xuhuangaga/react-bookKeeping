import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import user from './reducers/user'
import bill from './reducers/bill'
import consumptionType from './reducers/consumptionType'
import statistics from './reducers/statistics'


const store = createStore(combineReducers({
  user,bill,consumptionType,statistics
}), applyMiddleware(thunk))

export default store