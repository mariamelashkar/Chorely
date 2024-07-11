import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const showUserModal = (user) => {
    setSelectedUser(user);
    if (user) {
      userForm.setFieldsValue(user);
    }
    setIsUserModalVisible(true);
  };

  const handleUserModalCancel = () => {
    setIsUserModalVisible(false);
    setSelectedUser(null);
    userForm.resetFields();
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
      <Button onClick={() => showUserModal(null)}>Create User</Button>
      <Table columns={userColumns} dataSource={users} rowKey="id" />

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

export default UserManagement;
