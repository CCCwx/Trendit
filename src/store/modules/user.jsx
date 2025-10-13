//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
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

export {setToken}
export default userReducer