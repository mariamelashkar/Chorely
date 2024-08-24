import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import CreateTask from './CreateTask';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      message.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  const showModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      message.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const columns = [
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
      dataIndex: 'due_date',
      key: 'due_date',
      render: (date) => (date ? moment(date).format('YYYY-MM-DD') : 'N/A'),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assigned_to',
      key: 'assigned_to',
      render: (user) => user || 'Unassigned',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} type="danger">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="task-management">
      <Button type="primary" onClick={() => showModal(null)}>
        Create Task
      </Button>
      <Table
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title={selectedTask ? 'Edit Task' : 'Create Task'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateTask
          fetchTasks={fetchTasks}
          editTask={selectedTask}
          users={users}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default TaskManagement;
