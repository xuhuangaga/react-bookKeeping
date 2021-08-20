import React from 'react'
import styles from '../../App.module.scss'
import { Icon } from '../../types'
import { Progress } from 'zarm'

interface Props {
  arr: any,
  active: number,
  totalMoney: number
}
const Speed = (props: Props) => {
  return (
    <div>
      {
        props.arr && props.arr.map((item: any, index: number) => {
          return (
            <div className={`f-j-b p-10`} key={index}>
              <div className={` f-a-c`}>
                <div className={`yd p-5 
            ${styles.zcbg} ${props.active === 1 ? styles.icfO : styles.icfT}`}>
                  <i className={`iconfont f-c-w f-s16 
              ${Icon.filter((i: any) => { return i.name === item.type_name })[0].src} ${styles.icf}
              `}></i>
                </div>
                <div className={`m-lr10 f-s12`}>{item.type_name}</div>
                <div className={`f-s12 m-r10`}>￥{Number(item.number).toFixed(2)}</div>
              </div>
              <div className={`progress ${styles.sProgress}`} style={{ width: 200 }}>
                <Progress
                  shape="line"
                  percent={Number(((item.number/props.totalMoney)*100).toFixed(2))}
                  theme='primary'
                  strokeShape='round'
                />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Speed
