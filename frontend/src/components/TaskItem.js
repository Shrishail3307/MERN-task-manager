import React from 'react';

function TaskItem({ task, onEdit, onDelete }) {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';

  return (
    <li className="task-item">
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <span className={`badge ${task.status}`}>Status: {task.status}</span>
        <span className="due">Due: {due}</span>
      </div>
      <div className="task-actions">
        <button className="btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;
