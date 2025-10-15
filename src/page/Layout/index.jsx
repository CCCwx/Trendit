import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate,useLocation} from 'react-router-dom'

const { Header, Sider } = Layout

const items = [
  {
    label: 'Home Page',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Blog Management',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Create Blog',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) =>{
    console.log(route)
    navigate(route.key)
  }
  //1.获取当前路由路径
  const location = useLocation()
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">Wuxi</span>
          <span className="user-logout">
            <Popconfirm title="Confirm Logout?" okText="Logout" cancelText="Cancel">
              <LogoutOutlined /> Logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[location.pathname]} 
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick = {onMenuClick}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/*二级 路由出口 */}
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout