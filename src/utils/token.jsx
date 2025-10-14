//封装和token相关的方法

//存
const TokenKey = 'token_key'
function setToken (token){
    localStorage.setItem(TokenKey, token)
}

function getToken(){
    return localStorage.getItem(TokenKey)
}


function removeToken(){
    localStorage.removeItem(TokenKey)
}

export{
    setToken,
    getToken,
    removeToken
}