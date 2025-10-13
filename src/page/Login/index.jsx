import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'
//import background from '@/assets/background.png' // <-- 确保这个路径正确


const Login = () => {
    const onFinish = (value) =>{
        console.log(value)
    }
    return (
        <div className="login" >
            <Card className="login-container" >
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
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