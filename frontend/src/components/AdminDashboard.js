import React, { useEffect, useState } from 'react';
import { fetchAllTasks, createTask, updateTask, deleteTask } from '../api'; // Import the centralized API

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formState, setFormState] = useState({ title: '', description: '' });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, formState);
      } else {
        await createTask(formState);
      }
      const data = await fetchAllTasks();
      setTasks(data);
      setFormState({ title: '', description: '' });
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      const data = await fetchAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formState.title}
          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
        />
        <button type="submit">{selectedTask ? 'Update Task' : 'Create Task'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => setSelectedTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
