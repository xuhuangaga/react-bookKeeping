import React, { useState, useEffect } from 'react'
import styles from '../../App.module.scss'
import { Input, Button, Checkbox, Toast } from 'zarm';
import { useSelector, useDispatch } from 'react-redux'
import { register, login } from '../../store/actions/user'
import { useWatch } from '../../hooks/useWatch'
import { useHistory } from 'react-router-dom'

interface Obj {
  name: string
}
const Login = () => {
  let history = useHistory()
  let dispatch = useDispatch()
  let state = useSelector((state: any) => state)
  //tab选中的下标
  let [active, setActive] = useState<number>(0)
  //账号
  let [userName, setuserName] = useState<string>('')
  //密码
  let [psd, setPsd] = useState<string>('')
  //验证码
  let [code, setCode] = useState<string>('')
  //验证码数组
  let [codeArr, setCodeArr] = useState<string[]>([
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'
    , 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ])
  let [random, setRandom] = useState<string>('')
  //tab选项卡数组
  let [arr, setArr] = useState<Obj[]>([
    {
      name: '登录'
    }, {
      name: '注册'
    }
  ])
  // 点击tab
  let activeItem = (index: number) => {
    setActive(index)
    // state.user.isSuccess=false
  }
  //页面加载
  useEffect(() => {
    change()
  }, [])
  //监听
  useWatch(() => {
    if (state.user.isSuccess) {
      setActive(0)
      state.user.isSuccess = false
      if (localStorage.getItem('token'))
        history.push('/')
    }
  }, [state.user.isSuccess])
  //切换验证码
  const change = () => {
    let temp = ''
    //获取随机四个字母数字
    for (let i = 0; i <= 3; i++) {
      temp += codeArr[Math.ceil(Math.random() * codeArr.length - 1)]
    }
    setRandom(temp)
  }
  //点击登录 注册
  const submit = () => {
    let flag = true
    if (!userName) {
      flag = false
      Toast.show('请输入用户名')
      return
    }
    if (!psd) {
      flag = false
      Toast.show('请输入密码')
      return
    }

    if (active) {
      //注册
      if (!code) {
        flag = false
        Toast.show('请输入验证码')
        return
      }
      if (code !== random) {
        flag = false
        Toast.show('验证码输入有误')
        return
      }

      if (flag) {
        dispatch(register({
          username: userName,
          password: psd
        }))
      }
    } else {
      //登录
      if (flag) {
        dispatch(login({
          username: userName,
          password: psd
        }))
      }
    }
  }
  return (
    <div>
      <div className={`${styles.ldv} h-vh`}>
        <div className={`${styles.limg}`}></div>
        <div className={`p-20 m-t20`}>
          <div className={`${styles.item} f-a-c`}>
            {
              arr.map((item: Obj, index: number) => {
                return (
                  <div key={index} onClick={() => activeItem(index)} className={`m-r10 f-w-b ${styles.item} ${active === index ? styles.activeItem : ''}`}>{item.name}</div>
                )
              })
            }
          </div>
          <div className={`m-t10`}>
            <div className={`f-a-c`}>
              <i className={`iconfont icon-shoujihao ${styles.iconfont}`}></i>
              <Input
                className={`p-l10`}
                clearable={false}
                type="text"
                placeholder="请输入账号"
                value={userName}
                onChange={(value: any) => {
                  setuserName(value);
                }}
              />
            </div>
            <div className={`f-a-c m-t20`}>
              <i className={`iconfont icon-mima54 ${styles.iconfont}`}></i>
              <Input
                className={`p-l10`}
                clearable={false}
                type="password"
                placeholder="请输入密码"
                value={psd}
                onChange={(value: any) => {
                  setPsd(value);
                }}
              />
            </div>
            {
              active ?
                <div>
                  <div className={`f-a-c m-t20`}>
                    <i className={`iconfont icon-mima54 ${styles.iconfont}`}></i>
                    <Input
                      className={`p-l10`}
                      clearable={false}
                      type="text"
                      placeholder="请输入验证码"
                      value={code}
                      onChange={(value: any) => {
                        setCode(value);
                      }}
                    />
                    <div className={`${styles.code} f-j-c`} onClick={change}>{random}</div>
                  </div>
                  <Checkbox className={`m-t20 f-c-6`}>阅读并同意《掘掘手札条款》</Checkbox>
                </div>
                : null
            }

            <Button block theme="primary" className={`m-t20`} onClick={submit}>
              {!active ? '登录' : '注册'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
