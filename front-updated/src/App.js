import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data || []);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleSaveTask = async (task) => {
    try {
      if (currentTask) {
        await axios.put(`http://localhost:8080/api/tasks/${task.id}`, task);
        setTasks(tasks.map(t => t.id === task.id ? task : t));
      } else {
        const response = await axios.post('http://localhost:8080/api/tasks', task);
        setTasks([...tasks, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving task', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main">
          <Sidebar role={role} />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard tasks={tasks} onAddTask={handleAddTask} />} />
              <Route path="/tasks" element={<TaskList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />} />
              {role === 'admin' && (
                <Route path="/user-management" element={<UserManagement tasks={tasks} onAddTask={handleAddTask} />} />
              )}
              <Route path="/settings" element={<div>Settings Component</div>} />
              <Route path="/" element={<Dashboard tasks={tasks} onAddTask={handleAddTask} />} />
            </Routes>
          </div>
        </div>
        {showModal && (
          <TaskModal
            task={currentTask}
            onSave={handleSaveTask}
            onClose={() => setShowModal(false)}
          />
        )}
        <footer>
          <button className="logout" onClick={() => setIsLoggedIn(false)}>Logout</button>
        </footer>
      </div>
    </Router>
  );
}

export default App;
