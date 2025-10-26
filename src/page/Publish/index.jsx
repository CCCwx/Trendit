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
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill-new'         // 1. JS组件来自 new 包
import 'quill/dist/quill.snow.css'        // 2. CSS样式来自 old 包
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelAPI,getArticleAPI } from '@/apis/articles'
import { message } from 'antd'
import { useChannel } from '@/hooks/useChannel'
const { Option } = Select

const Publish = () => {
  const {channel} = useChannel()
  //提交表达
  const onFinish = (formvalue) =>{
    console.log(formvalue)
    //校验封面类型covertype是否和实际的图片列表imageList数量是相当的
    if (imageList.length !== covertype) return message.warning('数量不匹配')
    const {title, content, channel_id} = formvalue //解构提交表单的数据
    //1. 按照接口文档格式处理表单数据
    const repData = {
      title,
      content,
      cover:{
        type:covertype,
        images:imageList.map(item => item.response.data.url)
      },
      channel_id
    }
    //2. 调用接口
    createArticleAPI(repData)
  }

  //上传图的回调函数
  const [imageList, setImageList] = useState([])
  const onChange = (value)=>{
    console.log('uploading')
    console.log(value)
    setImageList(value.fileList)
  }

  //根据选项模型切换封面类型（single，triple显示上传页面，否则无）
  const [covertype, setCover] = useState(1)
  const onTypeChange = (info)=>{
    console.log('切换封面')
    console.log(info)
    setCover(info.target.value)
  }

  //回填数据
  //这里请看react_router那里
  const [searchParams] = useSearchParams()
  const articleID = searchParams.get('id')
  console.log(articleID)
  //获取实例
  {/*
    我用 Form.useForm() 创建了实例 (form)。

    我把这个实例通过 form={form} 绑定到了 <Form> 组件上。

    现在这个表单就完全归我这个 form 实例来操控。

    我调用 form.setFieldsValue({...}) 来告诉实例“请更新你的状态”。

    因为实例控制着屏幕上的表单，所以屏幕上的表单数据就回填更新了。
    
    不能直接传入 res.data，你需要**“扁平化”或“重构”**数据结构，确保键名与 Form.Item 的 name 属性完全对应。

    ==============重要=================
    只有设置了 name 属性的 <Form.Item> 的值，才会通过 form.setFieldsValue 来更新。
    imageList 和 covertype：它们没有被包装在 <Form.Item name="..."> 中。它们是通过独立的 useState 管理的 (const [imageList, setImageList] = useState([]), const [covertype, setCover] = useState(1))。

    结论： form.setFieldsValue 不会自动更新 imageList 和 covertype 状态。
    */}
  const [form] = Form.useForm() //创建一个表单实例，并且将这个实例对象存储在一个react状态变量中
  useEffect(()=>{
    //1. 通过id获取数据
    if (!articleID) return;
    async function getArticleDetail(){
      const res = await getArticleAPI(articleID)
      form.setFieldsValue({
        ...res.data,
        type:res.data.cover.type
      })
      //回填图片({url:url})
      setCover(res.data.cover.type)
      setImageList(res.data.cover.images.map(url =>{
        return {url}
      }))

    }
    //只有有id才调用此函数回填
    if (articleID){
      //2. 调用示例方法，完成回填
      getArticleDetail()
    }
  }, [articleID, form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleID ? '编辑':'发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish = {onFinish}
          form={form} //将上一步创建的**“遥控器”实例**连接到你的 <Form> JSX 元素上。
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
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/*value属性用户选择之后会自动收集起来作为接口的提交字段 */}
             {channel.map(item => <Option key = {item.id} value={item.id}>{item.name}</Option>)} 
            </Select>
          </Form.Item>

          {/*这里添加一个上传图的框 */}
          <Form.Item label="Cover">
            <Form.Item name="type">
              {/*当用户选择一个 Radio 按钮时，该按钮的 value (1, 3, 或 0) 就会被收集到表单数据的 type 字段下 */}
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>Single</Radio>
                <Radio value={3}>Triple</Radio>
                <Radio value={0}>None</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType: 决定选择文件筐的外观样式
              showUploadList：控制显示上传列表'
              action:指定文件上传的目标 URL 地址
              name:指定上传文件在 HTTP POST 请求中作为哪个字段名携带。
              onChange:当上传过程中的文件状态发生任何变化时，这个函数都会被触发。
              当 onChange 被触发时，它会接收到一个包含当前所有文件状态信息的参数（通常是 info 对象），其中最重要的是 fileList 数组
            */}
            {covertype > 0 && 
            <Upload
              listType="picture-card" 
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              maxCount={covertype}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}> 
                <PlusOutlined /> 
              </div>
            </Upload>
            }
            
          </Form.Item>


          <Form.Item
            label="Content"
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
                Publish Blog
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish