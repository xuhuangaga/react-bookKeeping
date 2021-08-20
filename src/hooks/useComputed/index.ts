import {useMemo} from 'react'

type Callback = ()=>any

export const useComputed=(callback:Callback,data:any)=>{
  return useMemo(callback,[data])
}