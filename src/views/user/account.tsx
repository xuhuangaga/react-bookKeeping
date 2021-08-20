import React, { useState } from 'react'
import { NavBar, Icon, Input, Cell, Button } from 'zarm';
import { useSelector, useDispatch } from 'react-redux'
import { modifyPass } from '../../store/actions/user'

const Account = () => {
  let dispatch = useDispatch()
  let state = useSelector((state: any) => state)
  let [oldPsd, setOldPsd] = useState<string>('')
  let [newPsd, setNewPsd] = useState<string>('')
  let [confirmPsd, setConfirmPsd] = useState<string>('')
  const submit = () => {
    dispatch(modifyPass({ old_pass: oldPsd, new_pass: newPsd, new_pass2: confirmPsd }))
  }
  return (
    <div>
      <div className={`b-b`}>
        <NavBar
          left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
          title="重置密码"
        />
      </div>
      <div>
        <Cell title="原密码">
          <Input
            clearable
            type="password"
            placeholder="请输入原密码"
            value={oldPsd}
            onChange={(value: any) => {
              setOldPsd(value);
            }}
          />
        </Cell>
        <Cell title="新密码">
          <Input
            clearable
            type="password"
            placeholder="请输入新密码"
            value={newPsd}
            onChange={(value: any) => {
              setNewPsd(value);
            }}
          />
        </Cell>
        <Cell title="确认密码">
          <Input
            clearable
            type="password"
            placeholder="请再次输入新密码确认"
            value={confirmPsd}
            onChange={(value: any) => {
              setConfirmPsd(value);
            }}
          />
        </Cell>
        <div className={`p-10`}>
          <Button block theme="primary" onClick={submit}>提交</Button>
        </div>
      </div>
    </div>
  )
}

export default Account
