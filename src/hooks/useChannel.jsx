// 封装获取频道列表的逻辑
import { useState, useEffect } from "react"
import {  getChannelAPI } from '@/apis/articles'

function useChannel(){
    //1. 获取频道列表中的逻辑
    const [channel, setChannel] = useState([])
    useEffect(()=>{
        //1）. 封装一下函数 在函数体内调用接口
        const getChanneList = async () =>{
        const res = await getChannelAPI()
        setChannel(res.data.channels)
        }
        //2）. 调用函数
        getChanneList()
    }, [])

    //2. 把组件中要用到的数据return
    return {
        channel
    }
    

}

export {useChannel}