import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [taskForm] = Form.useForm();
  const [userForm] = Form.useForm();

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const showTaskModal = (task) => {
    setSelectedTask(task);
    if (task) {
      taskForm.setFieldsValue(task);
    }
    setIsTaskModalVisible(true);
  };

  const showUserModal = (user) => {
    setSelectedUser(user);
    if (user) {
      userForm.setFieldsValue(user);
    }
    setIsUserModalVisible(true);
  };

  const handleTaskModalCancel = () => {
    setIsTaskModalVisible(false);
    setSelectedTask(null);
    taskForm.resetFields();
  };

  const handleUserModalCancel = () => {
    setIsUserModalVisible(false);
    setSelectedUser(null);
    userForm.resetFields();
  };

  const onTaskFinish = async (values) => {
    try {
      const response = selectedTask
        ? await fetch(`/api/tasks/${selectedTask.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
        : await fetch('/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      if (response.ok) {
        fetchTasks();
        handleTaskModalCancel();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const onUserFinish = async (values) => {
    try {
      const response = selectedUser
        ? await fetch(`/api/users/${selectedUser.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
        : await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      if (response.ok) {
        fetchUsers();
        handleUserModalCancel();
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const deleteTask = async (taskId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            fetchTasks();
          }
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      },
    });
  };

  const deleteUser = async (userId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            fetchUsers();
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      },
    });
  };

  const markTaskAsCompleted = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const taskColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (text ? 'Completed' : 'Pending'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => showTaskModal(record)}>Edit</Button>
          <Button onClick={() => deleteTask(record.id)}>Delete</Button>
          <Button onClick={() => markTaskAsCompleted(record.id)}>Mark Completed</Button>
        </>
      ),
    },
  ];

  const userColumns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => showUserModal(record)}>Edit</Button>
          <Button onClick={() => deleteUser(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => showTaskModal(null)}>Create Task</Button>
      <Button onClick={() => showUserModal(null)}>Create User</Button>
      <Table columns={taskColumns} dataSource={tasks} rowKey="id" />
      <Table columns={userColumns} dataSource={users} rowKey="id" />

      <Modal title={selectedTask ? 'Edit Task' : 'Create Task'} visible={isTaskModalVisible} onCancel={handleTaskModalCancel} footer={null}>
        <Form form={taskForm} onFinish={onTaskFinish}>
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
              {users.map((user) => (
                <Option key={user.id} value={user.username}>
                  {user.username}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title={selectedUser ? 'Edit User' : 'Create User'} visible={isUserModalVisible} onCancel={handleUserModalCancel} footer={null}>
        <Form form={userForm} onFinish={onUserFinish}>
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
    </div>
  );
};

export default AdminDashboard;
