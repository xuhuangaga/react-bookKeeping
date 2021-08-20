import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ConfigProvider} from 'zarm'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
   <ConfigProvider primaryColor="#007fff">
    <App />
  </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
