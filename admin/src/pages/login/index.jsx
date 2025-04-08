import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Login = () => {
  const navigate = useNavigate()

  const onFinish = (values) => {
    // 实际应该调用登录接口
    if (values.accountName === 'admin' && values.userPassword === 'admin') {
      localStorage.setItem('token', 'fake-token')
      message.success('登录成功')
      navigate('/')
    } else {
      message.error('账户或密码错误')
    }
  }

  return (
    <div className='loginDiv'>
      <Form  className='loginForm' name="sys_login" onFinish={onFinish}> 
        <h3>系统登录</h3>
        <Form.Item name="accountName" rules={[{ required: true, message: '请输入账号' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
        </Form.Item>

        <Form.Item name="userPassword" rules={[{ required: true, message: '请输入密码' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>登录</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Login