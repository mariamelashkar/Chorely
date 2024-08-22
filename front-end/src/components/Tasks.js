import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import CreateTask from './CreateTask';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleCreate = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleFinish = () => {
    fetchTasks();
    setModalVisible(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
    { title: 'Assigned To', dataIndex: 'assigned_to', key: 'assigned_to' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2>Tasks</h2>
      <Button type="primary" onClick={handleCreate}>Create Task</Button>
      <Table columns={columns} dataSource={tasks} rowKey="id" />
      <Modal
        title={editingTask ? 'Edit Task' : 'Create Task'}
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <CreateTask
          onFinish={handleFinish}
          onCancel={() => setModalVisible(false)}
          users={users}
          task={editingTask}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
