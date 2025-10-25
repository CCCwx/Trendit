//放置跟发表文章相关的所有请求
//放置跟用户相关的所有请求
import { request } from "@/utils/request.jsx";
//1. 获取频道
export function getChannelAPI(){
    //返回的是一个promise
    return request({
        url:'/channels',
        method:'get'
    })
}

//2. 上传文章
export function createArticleAPI(repData){
    return request({
        url:'mp/articles?draft=false',
        method:'POST',
        //data:publishForm
        data: repData
    })
}

//3. 获取文章列表
export function getArticleListAPI(params){
    return request({
        url:'mp/articles',
        method:'get',
        params
    })
}