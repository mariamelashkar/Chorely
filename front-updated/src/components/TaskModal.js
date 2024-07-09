import React, { useState} from 'react';
import '../styles/TaskModal.css'

const TaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.due_date : '');
  const [priority, setPriority] = useState(task ? task.priority : 'Low');

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      due_date: dueDate,
      priority,
    };
    onSave(updatedTask);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TaskModal;
