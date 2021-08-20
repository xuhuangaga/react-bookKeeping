import React, { useState, useEffect } from 'react'
import Tabbar from '../../components/tabbar/tabbar'
import styles from '../../App.module.scss'
import { Button, Cell, Icon } from 'zarm'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userInfo } from '../../store/actions/user'

interface Obj {
  title: string,
  src: string,
  url: string
}
function my() {
  let dispatch = useDispatch()
  let users = useSelector((state: any) => state.user.users)
  let history = useHistory()
  let [activeKey, setActiveKey] = useState('my')
  let [arr, setArr] = useState<Obj[]>([
    {
      title: '用户信息修改',
      src: '//s.yezgea02.com/1615974766264/gxqm.png',
      url: '/userinfo'
    },
    {
      title: '重置密码',
      src: '//s.yezgea02.com/1615974766264/zhaq.png',
      url: '/account'
    },
    {
      title: '关于我们',
      src: '//s.yezgea02.com/1615975178434/lianxi.png',
      url: '/about'
    }
  ])
  //获取用户信息
  useEffect(() => {
    dispatch(userInfo())
  }, [])
  //跳转页面
  const goto = (url: string) => {
    history.push(url)
  }
  //退出登录
  const signout = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  return (
    <div className={`${styles.mydv}`}>
      <div className={`${styles.top} f-c-w`}>
        <div className={`f-j-b p-20`}>
          <div>
            <div className={`${styles.nickdv} f-w-b`}>
              昵称: <span className={`m-l10`}>{users && users.username}</span>
            </div>
            <div className={`f-a-c m-t10`}>
              <img src="//s.yezgea02.com/1615973630132/geqian.png" style={{ width: 30, height: 30 }} />
              <div>{users && users.signature}</div>
            </div>
          </div>
          <div>
            <img src={users && users.avatar} style={{ width: 60, height: 60 }} />
          </div>
        </div>
      </div>
      <div className={`bc-e p-l-r10 ${styles.bottom} p-r`}>
        <div className={`${styles.content} bc-w br-10 p-b`}>
          {
            arr.map((item: Obj, index: number) => {
              return (
                <Cell hasArrow key={index} title={item.title} icon={<img src={item.src}
                  style={{ width: 20, height: 20 }} />} onClick={() => goto(item.url)} />
              )
            })
          }
        </div>
        <Button block theme="danger" className={`${styles.signout} p-f`} onClick={signout}>退出登录</Button>
      </div>
      <Tabbar activeKey={activeKey}></Tabbar>
    </div>
  )
}

export default my
