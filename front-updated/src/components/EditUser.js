// components/EditUser.js
import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';

const EditUser = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: initialValues.username,
      email: initialValues.email,
      role: initialValues.role,
    });
  }, [initialValues, form]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="edit-user"
      onFinish={(values) => {
        const updatedUser = { ...initialValues, ...values };
        onFinish(updatedUser);
      }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
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
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please select the role!' }]}
      >
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
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

export default EditUser;
