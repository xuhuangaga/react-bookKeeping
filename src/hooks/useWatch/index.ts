import {useEffect} from 'react'

type Callback = ()=>void

export const useWatch = (callback:Callback,data:any)=>{
  useEffect(callback,[data])
}