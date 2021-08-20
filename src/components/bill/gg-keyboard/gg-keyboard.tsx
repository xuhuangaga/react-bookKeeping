import React, { useState } from 'react'
import { Popup } from 'zarm'
import './index.scss'

interface Props {
  visible?: boolean,
  close: () => void,
  clickKey?: (item: string) => void,
  backspace?: () => void,
  clickOk:()=>void
}


const GgKeyboard = (props: Props) => {
  let { visible, clickKey, backspace, close } = props
  let keyBoardItem = ['1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    '0',
    '<svg viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg"><path d="M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z" fill="currentColor"></path></svg>']
  let onMaskClick = () => {
    close()
  }
  let clickItem = (item: string, index: number) => {
    if (index !== keyBoardItem.length - 1) {
      clickKey && clickKey(item)
    } else {
      backspace && backspace()
    }
  }
  return (
    // <Popup visible={visible} direction="bottom" onMaskClick={onMaskClick}>
    <div style={{ background: '#fff ' }}>
      <div className='cc-number-keyboard-wrap  f-a-c'>
        <div className='cc-number-keyboard-wrap-content' style={{width:'80%'}}>
          {
            keyBoardItem.map((item: string, index: number) => {
              return (
                <div className="cc-number-keyboard-wrap-content-item" key={index} onClick={() => clickItem(item, index)}>
                  <div className='cc-number-keyboard-wrap-content-item-key' dangerouslySetInnerHTML={{
                    __html: item
                  }}></div>
                </div>
              )
            })
          }
        </div>
        <div 
        style={{width:'20%',background:'#007fff',height:210,margin:'-5px 0px 0px 0px'}} 
        className={`f-c-w f-j-c`}
        onClick={props.clickOk}
        >
          <div>确认</div>
        </div>
      </div>
    </div>
    // </Popup>
  )
}

GgKeyboard.defaultProps = {
  visible: false
}


export default GgKeyboard
