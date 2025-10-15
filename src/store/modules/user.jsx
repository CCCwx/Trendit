//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import {request } from "@/utils";
import { setToken as _setToken, getToken, removeToken } from "@/utils";

const userStore = createSlice({
    name:'user', //当前模块名
    
    //
    initialState:{
        //后端传过来的格式就是token的数值
        //token: localStorage.getItem('token_key') || null, 
        token: getToken() || null,
        userInfo: {},
    },

    //同步修改方法
    reducers:{
        setToken(state, action){
            state.token = action.payload

            //在localstorage存一份
            if (action.payload) {
                //localStorage.setItem('token_key', action.payload);
                _setToken(action.payload)
            } else {
                removeToken('token_key'); // 如果传入 null，则清除
            }
        },

        setUserInfo(state, action){
            state.userInfo = action.payload
        },

        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()
        },
    }
})

//解构actionCreator
const {setToken, setUserInfo, clearUserInfo} = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步请求
//传我们表单收集到的数据
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
  }
}

//获取个人用户信息异步方法
const fetchuserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export {fetchLogin, fetchuserInfo, clearUserInfo}
export default userReducer