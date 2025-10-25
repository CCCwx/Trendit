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

  //获取文章列表
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() =>{
    async function getList(){
      const res = await getArticleListAPI()
      //console.log(res.data.results)
      setArticleList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  }, [])

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
        <Form initialValues={{ status: '' }}>
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
              defaultValue="lucy"
              style={{ width: 120 }}
            >
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