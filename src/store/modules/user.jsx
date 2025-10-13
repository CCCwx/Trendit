//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
const userStore = createSlice({
    name:'user', //当前模块名
    
    //
    initialState:{
        //后端传过来的格式就是token的数值
        token: ""
    },

    //同步修改方法
    reducers:{
        setToken(state, action){
            state.token = action.payload
        }
    }
})

//解构actionCreator
const {setToken} = userStore.actions

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
export {fetchLogin}
export default userReducer