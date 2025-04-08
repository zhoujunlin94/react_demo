import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button, Dropdown, Modal, Avatar, message} from 'antd'
import { UserOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { Header, Sider, Content } = Layout

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(true)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 实际从数据库获取
    const menuItems = [
      {
        key: '0',
        icon: <UserOutlined />,
        label: '首页',
        onClick: () => navigate('/')
      },
      {
        key: '1',
        icon: <UserOutlined />,
        label: '用户管理',
        onClick: () => navigate('/user')
      },
      {
        key: '2',
        icon: <SettingOutlined />,
        label: '系统设置',
        onClick: () => navigate('/settings')
      }
    ]
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  trigger={null}  collapsible collapsed={collapsed} theme="light"
                                            style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} >
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#f0f5ff', borderRadius: 8 }}>
            <div style={{ width: 24, height: 24, marginRight: 8 }} />
                <span style={{ fontFamily: 'Helvetica Neue',  fontWeight: 500, }}>MEET</span>
            </div>

            <Menu theme="light" mode="inline" defaultSelectedKeys={['0']} items={menuItems} style={{ borderRight: 0 }} />
        </Sider>

        <Layout>
            <Header style={{ padding: 0, background: '#fff', boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)', zIndex: 1,
                             position: 'sticky', top: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{  fontSize: '16px', width: 64, height: 64, color: 'rgba(0, 0, 0, 0.75)' }} />
                    </div>
                    
                    <Dropdown menu={{
                        items: [
                            {
                                key: '1',
                                label: '退出登录',
                                icon: <LogoutOutlined />,
                                danger: true,
                                onClick: () => {
                                    Modal.confirm({
                                        title: '确认退出登录吗？',
                                        content: '您将返回到登录页面',
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk() {
                                            localStorage.removeItem('token');
                                            navigate('/login');
                                            message.success('已安全退出');
                                        }
                                    });
                                }
                            }]
                        }}
                        placement="bottomRight">
                        <div style={{  padding: '0 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Avatar  style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
                            <span>管理员</span>
                        </div>
                    </Dropdown>
            </Header>
            <Content style={{ margin: '5px 5px', padding: 15, minHeight: 280, background: '#fff' }} >
                <Outlet />
            </Content>
        </Layout>

      </Layout>
    )
  }

  export default AppLayout