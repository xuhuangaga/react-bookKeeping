import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { Popup, DatePicker } from 'zarm'
import dayjs from 'dayjs'
import {Type} from '../../../types/'

interface Props {
  expenditure: number,
  income: number,
  choice: (id: number, time: string) => void,
  list: Type[],
}

const Top = (props: Props) => {
  let [typeVisible, setTypeVisible] = useState(false)
  let [dateVisible, setDateVisible] = useState(false)
  //选中的类型
  let [active, setActive] = useState(0)
  let [title, setTitle] = useState('全部类型')
  //选择的事件
  let [time, setTime] = useState(dayjs(new Date()).format('YYYY-MM'))
  return (
    <div>
      <div className={`${styles.tdv} f-c-w p-f p-10 z`}>
        <div className={`f-a-c`}>
          <div className={`f-s12 m-t5`}>总支出:</div>
          <div className={`f-w-b f-s25 m-lr10`}>￥{Number(props.expenditure).toFixed(2)}</div>
          <div className={`f-s12 m-t5`}>总收入:</div>
          <div className={`f-w-b f-s25 m-lr10`}>￥{Number(props.income).toFixed(2)}</div>
        </div>
        <div className={`f-j-e m-t20`}>
          <div className={`f-s12 ${styles.rdv} br-20`} onClick={() => { setTypeVisible(true) }}>
            {title}
            <i className={`iconfont icon-xiajiantou ${styles.icf}`}></i>
          </div>
          <div className={`f-s12 ${styles.rdv} br-20 m-l10`} onClick={() => { setDateVisible(true) }}>
            {time}
            <i className={`iconfont icon-xiajiantou ${styles.icf}`}></i>
          </div>
        </div>
      </div>
      {/* 类型弹框 */}
      <Popup
        visible={typeVisible}
        direction="bottom"
        mask
        onMaskClick={() => { setTypeVisible(false) }}
        
      >
        <div className={`f-j-c bc-w p-r`}>
          <div className={`m-t-b20`}>请选择类型</div>
          <i className={`iconfont icon-guanbi p-b ${styles.close}`} onClick={() => { setTypeVisible(false) }}></i>
        </div>
        <div className={`bc-e p-b20 p-10`}>
          <div className={`p-10 t-a-c ${styles.item} ${active === 0 ? styles.activeItem : ''}`}
            onClick={() => {
              setActive(0)
              setTitle('全部类型')
              setTypeVisible(false)
              props.choice(0, time)
            }}>全部类型</div>
          <div className={`m-t-b10`}>支出</div>
          {
            <div className={`f-w f`}>
              {
                props.list.length && props.list.filter((item: Type) => { return item.type === '1' }).map((item: Type) => {
                  return (
                    <div key={item.id} className={`p-10 t-a-c m-r10 m-b10 ${styles.item} 
                    ${active === item.id ? styles.activeItem : ''}`}
                      onClick={() => {
                        setActive(item.id)
                        setTitle(item.name)
                        setTypeVisible(false)
                        props.choice(item.id, time)
                      }}>{item.name}</div>
                  )
                })
              }
            </div>
          }
          <div className={`m-t-b10`}>收入</div>
          {
            <div className={`f-w f`}>
              {
                props.list.length && props.list.filter((item: Type) => { return item.type === '2' }).map((item: Type) => {
                  return (
                    <div key={item.id} className={`p-10 t-a-c m-r10 m-b10 ${styles.item} 
                    ${active === item.id ? styles.activeItem : ''}`}
                      onClick={() => {
                        setActive(item.id)
                        setTitle(item.name)
                        setTypeVisible(false)
                        props.choice(item.id, time)
                      }}>{item.name}</div>
                  )
                })
              }
            </div>
          }
        </div>
      </Popup>
      {/* 日期弹框 */}
      <Popup
        visible={dateVisible}
        direction="bottom"
        mask
        onMaskClick={() => { setDateVisible(false) }}
      >
        <DatePicker
          visible={dateVisible}
          mode="month"
          value={time}
          onOk={(value: any) => {
            setTime(dayjs(value).format('YYYY-MM'));
            setDateVisible(false)
            props.choice(active, dayjs(value).format('YYYY-MM'))
          }}
          onCancel={() => setDateVisible(false)}
        />
      </Popup>
    </div>
  )
}
export default Top
