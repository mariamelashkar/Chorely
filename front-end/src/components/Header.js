import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';

const { Option } = Select;

const CreateTask = ({ fetchTasks, users }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        form.resetFields();
        fetchTasks();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
        <Select>
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
      </Form.Item>
      <Form.Item name="assignedTo" label="Assigned To" rules={[{ required: true }]}>
        <Select>
          {users.map(user => (
            <Option key={user.id} value={user.id}>{user.username}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTask;
