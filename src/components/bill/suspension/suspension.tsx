import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { Popup, DatePicker, Input, Toast } from 'zarm'
import dayjs from 'dayjs'
import { Type, Icon } from '../../../types/'
import { useDispatch } from 'react-redux'
import { add, update } from '../../../store/actions/bill'
import GgKeyboard from '../gg-keyboard/gg-keyboard'

interface Props {
  list: Type[],
  reffer?: () => void,
  time?: string,
  id?: number,
  money?: string,
  visible?: boolean,
  remarks?: string,
  name?: string,
  closeDel?: () => void,
  typeId?: number,
  active?: number,
  isDetail?: boolean
}
const Suspension = (props: Props) => {
  let dispatch = useDispatch()
  //备注输入框是否显示
  let [show, setShow] = useState(false)
  let [time, setTime] = useState(props.isDetail ? props.time : dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
  let [visible, setVisible] = useState(props.isDetail ? props.visible : false)
  let [dateVisible, setDateVisible] = useState(false)
  //选择的金额
  let [money, setMoney] = useState(props.isDetail ? props.money : '')
  //备注
  let [remarks, setRemarks] = useState(props.remarks ? props.remarks : '添加备注')
  //选中的类型
  let [active, setActive] = useState(props.isDetail ? props.active : 0)
  // 选择的分类id
  let [id, setId] = useState(props.isDetail ? props.id : 0)
  // 父组件传过来的分类id
  let [idDel, setIdDel] = useState(props.isDetail ? props.typeId : 0)

  let [name, setName] = useState(props.isDetail ? props.name : '')
  let [isDetail, setIsDetail] = useState(props.isDetail ? props.isDetail : false)
  let [typeActive, setTypeActive] = useState(0)
  useEffect(() => {
    if (props.list.length && !id) {
      setId(props.list[0].id)
      setName(props.list[0].name) 
    }
  }, [props.list])
  let clickKey = (item: string) => {
    money += item
    setMoney(money)
  }
  let backspace = () => {
    money = money!.substring(0, money!.length - 1)
    setMoney(money)
  }
  let close = () => {
    setVisible(false)
    isDetail ? props.closeDel!() : null
  }
  const clickOk = () => {
    if (!money) {
      Toast.show('请输入具体金额')
    } else {
      if (props.isDetail) {
        //编辑请求
        dispatch(update({
          id: props.id!.toString(),
          amount: Number(money),
          type_id: isDetail ? idDel! : id!,
          type_name: name!,
          date: dayjs(time).valueOf(),
          pay_type: active ? 2 : 1,
          remark: remarks === '添加备注' ? '' : remarks!
        }))
        setTimeout(() => {
          props.reffer!()
          close()
        }, 1000);
      } else {
        console.log(id)
        //添加请求
        dispatch(add({
          amount: Number(money),
          type_id: id!,
          type_name: name!,
          date: dayjs(time).valueOf(),
          pay_type: active ? 2 : 1,
          remark: remarks === '添加备注' ? '' : remarks!
        }))
        setTimeout(() => {
          setVisible(false)
          props.reffer!()
        }, 1000);
      }
    }
  }
  // console.log(dayjs(1629281016000).format('YYYY-MM-DD HH:mm:ss'))
  return (
    <div>
      {
        props.id ? null :
          <div className={`p-f bc-w yd f-j-c ${styles.xfdv}`} onClick={() => {
            setVisible(true)
            setMoney('')
            setActive(0)
            setTypeActive(0)
          }}>
            <i className={`iconfont icon-bianji ${styles.icf}`}></i>
          </div>
      }
      <Popup
        visible={visible}
        direction="bottom"
        mask
        onMaskClick={() => {
          setShow(false)
          close()
        }}
      >
        <div className={`p-10 bc-w ${styles.popupdv} ${styles.tlr}`}>
          <div className={`f-j-e m-t10`}>
            <i className={`iconfont icon-guanbi p-b`} onClick={() => {
              close()
            }}></i>
          </div>
          <div className={`f-j-b m-t20`}>
            <div className={`f-a-c`}>
              <div className={`m-r10 f-c-9 br-20 ${styles.item} ${active === 0 ? styles.activeItemO : ''} `} onClick={() => {
                setActive(0)
                setTypeActive(0)
                setIsDetail(false)
                setId(props.list.length && props.list.filter
                  ((item: Type) => { return item.type === '1' })[0].id)
                setName((props.list.length && props.list.filter
                  ((item: Type) => { return item.type === '1' })[0].name) as string)
              }}>支出</div>
              <div className={`m-r10 f-c-9 br-20 ${styles.item} ${active === 1 ? styles.activeItemT : ''} `} onClick={() => {
                setActive(1)
                setTypeActive(0)
                setIsDetail(false)
                setId(props.list.length && props.list.filter((item: Type) => { return item.type === '2' })[0].id)
                setName((props.list.length && props.list.filter((item: Type) => { return item.type === '2' })[0].name) as string)
              }}>收入</div>
            </div>
            <div>
              <div className={`f-s12 ${styles.rdv} bc-e br-20 m-l10`} onClick={() => { setDateVisible(true) }}>
                {dayjs(time).format('MM-DD')}
                <i className={`iconfont icon-xiajiantou ${styles.icf}`}></i>
              </div>
            </div>
          </div>
          <div className={`b-b f-s30 m-t-b20 p-b10 f-w-b`}>
            ￥{money}
          </div>
          <div className={`m-t-b20 p-b20 f ${styles.typedv}`}>
            <div className={`${styles.tdv} f`}>
              {
                active ?
                  props.list.length && props.list.filter((item: Type) => { return item.type === '2' }).map((item: Type, index: number) => {
                    return (
                      <div onClick={() => {
                        setTypeActive(index)
                        setId(item.id)
                        setName(item.name)
                        setIsDetail(false)
                      }} key={item.id} className={`${styles.typeItem}`}>
                        <div className={`${styles.idv}  ${active && ((typeActive === index && !isDetail) || (idDel === item.id && isDetail)) ? styles.idvActiveT : ''} yd f-j-c`}>
                          <i className={`iconfont 
                          ${Icon.filter((i: any) => { return i.name === item.name })[0].src} ${styles.icf}`}></i></div>
                        <div className={`t-a-c`}>{item.name}</div>
                      </div>
                    )
                  })
                  :
                  props.list.length && props.list.filter((item: Type) => { return item.type === '1' })
                    .map((item: Type, index: number) => {
                      return (
                        <div onClick={() => {
                          setTypeActive(index)
                          setId(item.id)
                          setName(item.name)
                          setIsDetail(false)
                        }} key={item.id} className={`${styles.typeItem}`}>
                          <div className={`${styles.idv} ${!active && ((typeActive === index && !isDetail) || (idDel === item.id && isDetail)) ? styles.idvActiveO : ''} yd f-j-c`}>
                            <i className={`iconfont ${Icon.filter((i: any) => { return i.name === item.name })[0].src} ${styles.icf}} ${styles.icf}`}></i>
                          </div>
                          <div className={`t-a-c`}>{item.name}</div>
                        </div>
                      )
                    })
              }
            </div>
          </div>
          {
            show ?
              <div className={`p-10 m-lr10`} style={{ border: '1px solid #eee' }}>
                <Input
                  autoHeight
                  showLength
                  maxLength={50}
                  type="text"
                  rows={3}
                  placeholder="请输入备注信息"
                  value={remarks}
                  onChange={(value: any) => setRemarks(value)}

                />
              </div>
              :
              <div className={`m-t-b20 p-10 f-s12 ${styles.remarks}`}
                onClick={() => {
                  setShow(true)
                  if (remarks === '添加备注') {
                    setRemarks('')
                  }
                }}>
                {remarks}
              </div>
          }
          <div className={`m-t10`}>
            <GgKeyboard clickOk={clickOk} visible={true} close={close} clickKey={clickKey} backspace={backspace}></GgKeyboard>
          </div>
        </div>
        <DatePicker
          visible={dateVisible}
          mode="date"
          defaultValue={time}
          value={time}
          onOk={(value: any) => {
            setTime(value);
            setDateVisible(false)
          }}
          onCancel={() => setDateVisible(false)}
        />
      </Popup>
    </div>
  )
}
export default Suspension
