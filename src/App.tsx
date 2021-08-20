import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { commonRoutes, routes, RouterItem } from './router'
import './index.css'

function App() {
  return (
    <Router>
      <Switch>
        {commonRoutes.map((item: RouterItem, index: number) => {
          return (
            <Route key={index} path={item.path} exact={item.exact} render={() => {
              document.title = item.meta!.title
              return (
                <item.component />
              )
            }}></Route>
          )
        })}
        {
          routes.map((item:RouterItem,index:number)=>{
            return (
              <Route key={index} path={item.path} exact={item.exact} render={() => {
                document.title = item.meta!.title
                let token = localStorage.getItem('token')
                if (!token) {
                  return (
                    <Redirect to="/login"/>
                  )
                }
                return (
                  <item.component />
                )
              }}></Route>
            )
          })
        }
      </Switch>
    </Router>
  )
}

export default App
