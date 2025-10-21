import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill-new'         // 1. JS组件来自 new 包
import 'quill/dist/quill.snow.css'        // 2. CSS样式来自 old 包
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelAPI } from '@/apis/articles'

const { Option } = Select

const Publish = () => {
  //获取频道列表
  const [channel, setChannel] = useState([])
  useEffect(()=>{
    //1. 封装一下函数 在函数体内调用接口
    const getChanneList = async () =>{
      const res = await getChannelAPI()
      setChannel(res.data.channels)
    }
    //2. 调用函数
    getChanneList()
  }, [])

  //提交表达
  const onFinish = (formvalue) =>{
    console.log(formvalue)
    const {title, content, channel_id} = formvalue //解构提交表单的数据
    //1. 按照接口文档格式处理表单数据
    const repData = {
      title,
      content,
      cover:{
        type:0,
        images:[]
      },
      channel_id
    }
    //2. 调用接口
    createArticleAPI(repData)
  }
  
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish = {onFinish}
        >
        {/*标题框 */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

         {/*频道框 */}
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/*value属性用户选择之后会自动收集起来作为接口的提交字段 */}
             {channel.map(item => <Option key = {item.id} value={item.id}>{item.name}</Option>)} 
            </Select>
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/*这里添加富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme = "snow"
              placeholder='Please type something'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish