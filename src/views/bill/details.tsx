import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { NavBar, Icon, Modal } from 'zarm';
import { useSelector, useDispatch } from 'react-redux'
import { detail, bDel } from '../../store/actions/bill'
import { Icon as Icons } from '../../types'
import styles from '../../App.module.scss'
import dayjs from 'dayjs'
import Suspension from '../../components/bill/suspension/suspension';
import { list } from '../../store/actions/consumptionType'


const Details = () => {
  let dispatch = useDispatch()
  let data = useSelector((state: any) => state.bill.data)
  let tData = useSelector((state: any) => state.consumptionType.tData)
  let localtion = useLocation()
  let history = useHistory()
  //账单id
  let id = (localtion.state as any).id
  let [visible, setVisible] = useState(false)

  //页面加载
  useEffect(() => {
    dispatch(detail({ id: id.toString() }))
    dispatch(list())
  }, [])
  const reffer = () => {
    dispatch(detail({ id: id.toString() }))
  }
  //关闭底部弹框
  const closeDel = () => {
    setVisible(false)
  }
  //点击删除
  const del = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除账单?',
      onCancel: () => {
        // console.log('点击cancel');
      },
      onOk: () => {
        dispatch(bDel({ id: id.toString() }))
        history.push('/')
      },
    });
  }
  return (
    <div className={`bc-e h-vh ${styles.deltail}`}>
      <div className={`b-b`}>
        <NavBar
          left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
          title="账单详情"
        />
        <div className={`bc-w br-10 p-10`} style={{ margin: '10px 20px' }}>
          <div className={'f-j-c a-c m-t20'}>
            <div>
              <i className={`iconfont yd p-5 f-s20 f-c-w
            ${data.type_name && Icons.filter((i: any) => { return i.name === data.type_name })[0].src}
              ${data && data.pay_type === 1 ? styles.zc : styles.sr}`}></i>
            </div>
            <div className={`m-l10`}>{data && data.type_name}</div>
          </div>
          <div className={'f-j-c m-t-b20 f-w-b'}>
            <div className={`f-s20`}>
              {data && data.pay_type === 1 ? '-' : '+'}{data && data.amount}
            </div>
          </div>
          <div className={`f-a-c f-c-9`}>
            <div style={{ width: 80 }}>记录时间</div>
            <div className={`m-l10`}>{data && dayjs(Number(data.date)).format('YYYY-MM-DD HH:mm')}</div>
          </div>
          <div className={`f-a-c f-c-9 m-t-b10`}>
            <div style={{ width: 80 }}>备注</div>
            <div className={`m-l10`}>{data && data.remark ? data.remark : '-'}</div>
          </div>
          <div className={`f-j-a m-t20 m-b10`}>
            <div onClick={del}>
              <i className={`iconfont icon-shanchu f-s20 ${styles.deli}`}> 删除</i>
            </div>
            <div onClick={() => { setVisible(true) }}>
              <i className={`iconfont icon-icon6 f-s20`}> 编辑</i>
            </div>
          </div>
        </div>
      </div>
      {visible ?
        <Suspension
          list={tData}
          visible={visible}
          money={data && data.amount}
          remarks={data && data.remark}
          time={data && dayjs(Number(data.date)).format('YYYY-MM-DD HH:mm')}
          id={id}
          name={data && data.type_name}
          closeDel={closeDel}
          reffer={reffer}
          typeId={data && data.type_id}
          active={data && data.pay_type === 1 ? 0 : 1}
          isDetail={true}
        ></Suspension>
        : null
      }
    </div>
  )
}

export default Details
