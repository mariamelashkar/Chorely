import React from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';
import { API_BASE_URL } from './Config';

const { Option } = Select;

const CreateUser = ({ visible, onCancel, fetchUsers }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        form.resetFields();
        fetchUsers();
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Modal visible={visible} title="Create User" onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUser;
