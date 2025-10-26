import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/en_US'

const { Option } = Select
const { RangePicker } = DatePicker

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from 'D:/reactStudy/react-blog/src/assets/spiderman.jpg'
import { useChannel } from '@/hooks/useChannel'
import { getArticleListAPI } from '@/apis/articles'
import { useState, useEffect } from 'react'
const Article = () => {
  const {channel} = useChannel()
    // 准备列数据
    //定义一个枚举
  const status ={
    1: <Tag color="warning">Under review</Tag>,
    2: <Tag color="success">Approved</Tag>
  }
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      //data - 后端返回的状态statud，根据他做条件渲染
      // 如果data === 1 :待审核 ；data === 2：审核通过
      render: data => status[data]
    },
    {
      title: 'Publish Date',
      dataIndex: 'pubdate'
    },
    {
      title: 'Read Count',
      dataIndex: 'read_count'
    },
    {
      title: 'Commnet Count',
      dataIndex: 'comment_count'
    },
    {
      title: 'Like Count',
      dataIndex: 'like_count'
    },
    {
      title: 'Operation',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]

  //筛选功能
  //1.准备参数
  const [repData, setRepData] = useState({
    status:'',
    channel_id:'',
    begin_pubdate:'',
    end_pubdate:'',
    page:1,
    per_page: 4
  })

  //获取文章列表
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() =>{
    async function getList(){
      const res = await getArticleListAPI(repData)
      //console.log(res.data.results)
      setArticleList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  }, [repData])
   
  //2. 获取当前的筛选数据
  const onFinish = (formValue) =>{
    console.log(formValue)
    const { channel_id, status, date } = formValue
    let begin_pubdate = ''
    let end_pubdate = ''

    if (date && date.length === 2) {
      begin_pubdate = date[0].format('YYYY-MM-DD')
      end_pubdate = date[1].format('YYYY-MM-DD')
  }
    //3. 把表单数据放到请求接口对应的字段中(不可变的格式)
    setRepData({
      ...repData,
      page: 1, // 新筛选条件生效，页码重置为第1页
      channel_id: channel_id || '', // 确保空选项被视为 ''
      status: status,
      begin_pubdate, // 使用安全处理后的日期
      end_pubdate // 使用安全处理后的日期
    })
  }

  //4. 重新拉取文章列表
  //repData依赖项发生变化，重复执行副作用函数

  
  
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Article List' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '',channel_id: '' }} onFinish = {onFinish}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={''}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please select channel"
              defaultValue=""
              style={{ width: 120 }}
            > 
            {/* 添加 'All' 选项，对应 channel_id: '' */}
              <Option value={''}>All</Option>
              {channel.map(item => <Option key={item.id}value={item.id}>{item.name}</Option>)}
              
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Sift
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/*表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>
  )
}

export default Article