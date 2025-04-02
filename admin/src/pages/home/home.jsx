import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import logo from '../../assests/logo.png';

const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // 白底导航样式
  const siderStyle = {
    background: '#fff',
    borderRight: '1px solid #f0f0f0'  // 添加右边框
  };

  const headerStyle = {
    background: '#fff',
    boxShadow: '0 2px 8px #f0f0f0',  // 添加底部阴影
    borderBottom: '1px solid #f0f0f0'
  };

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: '首页' },
    { key: '/users', icon: <UserOutlined />, label: '用户管理' },
  ];

  const handleMenuClick = ({ key }) => navigate(key);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      {/* 修改侧边栏 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"  // 重要：设置为 light 主题
        style={siderStyle}
      >
        <div style={{ 
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 16px' // 添加内边距
        }}>
        <img 
        src={logo} 
        alt="系统LOGO"
        style={{
            width: '100%',      // 宽度自适应容器
            height: 'auto',     // 高度自动
            maxWidth: 120,      // 最大宽度限制
            objectFit: 'contain' // 保持图片比例
        }}
        />
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
          defaultSelectedKeys={['/']}
          style={{ borderRight: 0 }}  // 去除默认边框
        />
      </Sider>

      <Layout>
        {/* 修改顶部导航栏 */}
        <Header style={headerStyle}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              fontSize: 16,
              width: 64,
              height: 64,
              color: '#595959'  // 图标颜色
            }}
          />
          <div style={{ float: 'right', marginRight: 24 }}>
            <Button
              icon={<LogoutOutlined style={{ color: '#595959' }} />}
              onClick={handleLogout}
              type="text"
            >
              <span style={{ color: '#595959' }}>退出登录</span>
            </Button>
          </div>
        </Header>

        {/* 内容区域 */}
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24,
          background: '#fff',
          minHeight: 280
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home