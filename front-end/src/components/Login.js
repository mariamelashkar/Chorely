import React , {useContext} from 'react';
import { useNavigate  } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { login } from '../api';
import { AuthContext } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      const data = await login(values);
      console.log('Login successful:', data);
      // Save the token and user data in local storage or state
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth({
        isLogged: true,
        user: data.user,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
