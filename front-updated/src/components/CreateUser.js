// components/CreateUser.js
import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const CreateUser = ({ onFinish, onCancel }) => {
  const handleFinish = async (values) => {
    try {
      await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      onFinish();
      onCancel();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Form
      name="createUser"
      onFinish={handleFinish}
      initialValues={{ role: 'user' }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input the username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input the email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please select the role!' }]}
      >
        <Select>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
