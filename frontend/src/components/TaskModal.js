import React, { useState, useEffect } from 'react';

const TaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'low',
    completed: false,
    assigned_to: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <h3>{task ? 'Edit Task' : 'Create Task'}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Task Description" />
        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">{task ? 'Save Task' : 'Create Task'}</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskModal;
