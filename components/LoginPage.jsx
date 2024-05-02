import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const onFinish = values => {
    if (values.username === 'admin' && values.password === 'password') {
      message.success('Login successful!');
      router.push('/dashboard');
    } else {
      message.error('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px', width: '100%', background:'#ffff',padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
