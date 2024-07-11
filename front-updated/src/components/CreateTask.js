import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';

const { Option } = Select;

const CreateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
    setIsModalVisible(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleMarkCompleted = async (task) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, status: 'completed' }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = form.getFieldsValue();
      if (editingTask) {
        await fetch(`http://localhost:8080/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      } else {
        await fetch('http://localhost:8080/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      }
      form.resetFields();
      setIsModalVisible(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingTask(null);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Create Task
      </Button>
      <Table dataSource={tasks} rowKey="id">
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Description" dataIndex="description" key="description" />
        <Table.Column title="Due Date" dataIndex="dueDate" key="dueDate" />
        <Table.Column title="Priority" dataIndex="priority" key="priority" />
        <Table.Column title="Assigned To" dataIndex="assignedTo" key="assignedTo" />
        <Table.Column title="Status" dataIndex="status" key="status" />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, task) => (
            <>
              <Button onClick={() => handleEdit(task)}>Edit</Button>
              <Button onClick={() => handleDelete(task.id)} danger>
                Delete
              </Button>
              <Button onClick={() => handleMarkCompleted(task)}>Mark Completed</Button>
            </>
          )}
        />
      </Table>
      <Modal
        title={editingTask ? 'Edit Task' : 'Create Task'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form}>
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
                <Option key={user.id} value={user.username}>{user.username}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTask;
