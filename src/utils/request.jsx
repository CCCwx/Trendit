//axios的封装处理
import axios from "axios"
import { getToken } from "."
import { removeToken } from "."
import { useNavigate } from "react-router-dom"
//1. 根域名配置
//2. 超时时间
//3. 请求拦截器 / 响应拦截器
const request = axios.create({
    baseURL:'http://geek.itheima.net/v1_0', //根域名
    timeout: 5000 //超时时间
})

// 添加请求拦截器 request.interceptors.request.use(成功函数, 失败函数)
//在请求发送之前 做拦截 插入一些自定义的配置 参数的处理
request.interceptors.request.use(
    (config)=> {
        //操作这个config 注入我们的token数据
        //1. 获取token
        const token = getToken()
        //2. 按照后端的格式要求去做token的拼接
        if(token){
            //前面的是固定写法
            //等号后面是后端决定的
            config.headers.Authorization = `Bearer ${token}`
        }
        
        return config
    }, 

    (error)=> {
        return Promise.reject(error)
    }
)

// 添加响应拦截器 request.interceptors.response.use(成功函数, 失败函数)
// 在相应返回到客户端之前做拦截
// 重点处理返回的数据
request.interceptors.response.use(
    (response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
    }, 
    
    (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    //监控401 token失效
    console.dir(error)
    const navigate = useNavigate()
    if (error.response.status === 401){
        removeToken()
        navigate('/login')
    }
    return Promise.reject(error)
})

export {request}