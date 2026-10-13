import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
      setError('');
    } catch (err) {
      setError('Could not load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // Fetch once when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTaskData) => {
    try {
      await createTask(newTaskData);
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task.');
    }
  };

  const handleUpdateTask = async (id, updatedTaskData) => {
    try {
      await updateTask(id, updatedTaskData);
      setEditingTask(null);
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      if (editingTask && editingTask._id === id) setEditingTask(null);
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task.');
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {error && <p className="error">{error}</p>}
      <TaskForm
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialData={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
