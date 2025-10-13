import './index.scss'
import { Card, Form, Input, Button, Modal } from 'antd'
import logo from '@/assets/logo.png'
//import background from '@/assets/background.png' // <-- 确保这个路径正确
//import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onFinish = async (value) =>{
        console.log(value)
        //触发异步action
        await dispatch(fetchLogin(value))
        //1. 跳转到首页
        navigate('/')
        //2. 提示用户登入成功
        //console.success('Login Sucsess')

    }
    return (
        <div className="login" >
            <Card className="login-container" >
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                {/*当我们输入内容通过所有校验逻辑 点击login之后就会触发onFinish函数，会返回一个实参，通过我们吊起来的函数中的形参value接受 */}
                <Form validateTrigger="onBlur" onFinish={onFinish}> 
                    {/* 校验表单
                    这里name要和我们后端的接口名称保持一致 */}
                    <Form.Item
                    name = "mobile"
                    rules={[
                        //多条校验逻辑 先校验第一条，第一条通过后再校验第二条
                        {
                            required: true,
                            message: "Please input your phone number"
                        },
                        //利用正则式规范手机号格式
                        {
                            pattern:/^1[3-9]\d{9}$/,
                            message:"please input the right number format"
                        }
                        
                    ]}>
                        <Input size="large" placeholder="Please input phone number" />
                    </Form.Item>

                    <Form.Item
                    name = "code"
                    rules={[
                        {
                            required: true,
                            message: "Please input your validation vode"
                        }
                    ]}>
                        <Input size="large" placeholder="Pleasse input validation vode" />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large" 
                            block
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login