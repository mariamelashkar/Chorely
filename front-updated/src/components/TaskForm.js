import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const TaskForm = ({ fetchTasks, editTask, users, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editTask) {
      form.setFieldsValue({
        ...editTask,
        due_date: editTask.due_date ? moment(editTask.due_date) : null,
        assigned_to: editTask.assigned_to || null,
      });
    }
  }, [editTask, form]);

  const handleFinish = async (values) => {
    try {
      const taskData = {
        ...values,
        due_date: values.due_date ? values.due_date.format('YYYY-MM-DD') : null,
      };

      if (editTask) {
        await axios.put(`http://localhost:8080/api/tasks/${editTask.id}`, taskData);
        message.success('Task updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/tasks', taskData);
        message.success('Task created successfully');
      }
      fetchTasks();
      onCancel();
    } catch (error) {
      message.error('Error saving task');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the task title' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="due_date" label="Due Date">
        <DatePicker />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please select the task priority' }]}>
        <Select>
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
      </Form.Item>
      <Form.Item name="assigned_to" label="Assigned To">
        <Select>
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.username}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the task status' }]}>
        <Select>
          <Option value="pending">Pending</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
