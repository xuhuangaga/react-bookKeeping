import React, { useState, useEffect } from 'react'
import Tabbar from '../../components/tabbar/tabbar'
import styles from '../../App.module.scss'
import { DatePicker } from 'zarm'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { getStatistics } from '../../store/actions/statistics'
import Shape from '../../components/statistics/shape'
import Speed from '../../components/statistics/speed'

function statistics() {
  let dispatch = useDispatch()
  let data = useSelector((state: any) => state.statistics.sData)
  let [activeKey, setActiveKey] = useState('statistics')
  let [visible, setVisible] = useState(false)
  let [active, setActive] = useState(1)
  let [bActive, setBActive] = useState(1)
  let [time, setTime] = useState(dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
  //获取数据
  const getData = (time: string) => {
    dispatch(getStatistics({ date: time }))
  }
  //页面加载
  useEffect(() => {
    getData(dayjs(time).format('YYYY-MM'))
  }, [])
  return (
    <div className={`${styles.tjdv}`}>
      <div className={`f-j-c`}>
        <div>
          <div className={`${styles.rldv} bc-e p-5 f-a-c m-20`}>
            <div className={`f-s12 f-c-6`}>{dayjs(time).format('YYYY-MM')}</div>
            <div className={`m-lr10 ${styles.sx}`}></div>
            <div onClick={() => { setVisible(true) }}><i className={`iconfont icon-rili`}></i></div>
          </div>
          <div className={`m-t20`}>
            <div className={`t-a-c f-s12 ${styles.money}`}>共支出</div>
            <div className={`f-s16 f-w-b t-a-c m-t-b10 ${styles.money}`}>￥{data && data.total_expense}</div>
            <div className={`f-c-6 f-s12 t-a-c m-b20`}>共收入 ￥{data && data.total_income}</div>
          </div>
        </div>
      </div>
      <div className={`bc-e`} style={{ height: 10 }}></div>
      <div className={`f-j-b p-10`}>
        <div>收支结构</div>
        <div className={`f-a-c`}>
          <div className={`bc-e f-s12 br-5 ${styles.item} ${active === 1 ? styles.itemO : ''}`}
            onClick={() => { setActive(1) }}>支出</div>
          <div className={`bc-e m-l10 f-s12 br-5 ${styles.item} ${active === 2 ? styles.itemT : ''}`}
            onClick={() => { setActive(2) }}>收入</div>
        </div>
      </div>
      {
        active === 1 ?
          <Speed active={active} totalMoney={data && data.total_expense}
            arr={data && data.total_data &&
              data.total_data.filter((item: any) => { return item.pay_type === 1 }).sort((a: any, b: any) => {
                return b.number - a.number
              })}></Speed>
          :
          <Speed active={active} totalMoney={data && data.total_income}
            arr={data && data.total_data &&
              data.total_data.filter((item: any) => { return item.pay_type === 2 }).sort((a: any, b: any) => {
                return b.number - a.number
              })}></Speed>
      }
      <div className={`f-j-b p-20`}>
        <div>收支结构</div>
        <div className={`f-a-c`}>
          <div className={`bc-e f-s12 br-5 ${styles.item} ${bActive === 1 ? styles.itemO : ''}`}
            onClick={() => { setBActive(1) }}>支出</div>
          <div className={`bc-e m-l10 f-s12 br-5 ${styles.item} ${bActive === 2 ? styles.itemT : ''}`}
            onClick={() => { setBActive(2) }}>收入</div>
        </div>
      </div>

      {
        bActive === 1 ?
          <Shape totalMoney={data && data.total_expense} 
          arr={data && data.total_data && data.total_data.
            filter((item: any) => { return item.pay_type === 1 }).sort((a: any, b: any) => {
              console.log(b)
              return b.number - a.number
            })}></Shape>
          : <Shape totalMoney={data && data.total_income} 
          arr={data && data.total_data && data.total_data.
            filter((item: any) => { return item.pay_type === 2 }).sort((a: any, b: any) => {
              return b.number - a.number
            })}></Shape>
      }

      <DatePicker
        visible={visible}
        mode="month"
        defaultValue={time}
        value={time}
        onOk={(value: any) => {
          setTime(value);
          setVisible(false)
          getData(dayjs(value).format('YYYY-MM'))
        }}
        onCancel={() => setVisible(false)}
      />
      <Tabbar activeKey={activeKey}></Tabbar>
    </div>
  )
}

export default statistics
