import React, { useState, useEffect } from 'react';

const emptyForm = {
  title: '',
  description: '',
  status: 'pending',
  dueDate: '',
};

function TaskForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  // When a task is selected for editing, fill the form with its data
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending',
        // <input type="date"> needs YYYY-MM-DD
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : '',
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) {
      await onSubmit(initialData._id, formData);
    } else {
      await onSubmit(formData);
    }
    setFormData(emptyForm);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Task' : 'Add New Task'}</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        rows="3"
        value={formData.description}
        onChange={handleChange}
      />

      <div className="row">
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <button type="submit" className="btn primary">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
        {initialData && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
