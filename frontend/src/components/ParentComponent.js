import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

const ParentComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} users={users} />
    </div>
  );
};

export default ParentComponent;
