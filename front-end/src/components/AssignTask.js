// components/AssignTask.js
import React from 'react';
import { Form, Select, Button } from 'antd';

const { Option } = Select;

const AssignTask = ({ task, users, onFinish, onCancel }) => {
  const onFinishForm = async (values) => {
    try {
      await fetch(`http://localhost:8080/api/users/${values.userId}/tasks/${task.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onFinish();
      onCancel();
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  return (
    <Form onFinish={onFinishForm} initialValues={{ userId: task.assignedTo }}>
      <Form.Item
        name="userId"
        label="Assign To"
        rules={[{ required: true, message: 'Please select a user!' }]}
      >
        <Select>
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.username}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Assign Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssignTask;
