import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const EditTask = ({ task, fetchTasks, handleModalOk }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
      ...task,
      due_date: moment(task.due_date),
    });

    // Fetch the users to populate the "Assigned To" dropdown
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [task, form]);

  const onFinish = async (values) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          due_date: values.due_date.format('YYYY-MM-DD'),
        }),
      });
      if (response.ok) {
        fetchTasks();
        handleModalOk();
      } else {
        console.error('Error updating task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item name="due_date" label="Due Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
        <Select>
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>
      <Form.Item name="assigned_to" label="Assigned To" rules={[{ required: true }]}>
        <Select>
          {users.map((user) => (
            <Option key={user.username} value={user.username}>
              {user.username}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select>
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTask;
