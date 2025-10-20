//放置跟用户相关的所有请求
import { request } from "@/utils/request.jsx";
//1. 登录请求
export function loginAPI(loginForm){
    //返回的是一个promise
    return request({
        url:'/authorizations',
        method:'POST',
        data:loginForm
    })
}

//2.获取用户信息
export function fetchUserInfoAPI(){
    //返回的是一个promise
    return request({
        url:'/user/profile',
        method:'GET'
    })
}