const KEY = 'tasks';
const STATUSES = ['pending', 'in-progress', 'completed'];

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const write = (tasks) => localStorage.setItem(KEY, JSON.stringify(tasks));

export const getTasks = async () => {
  return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

export const createTask = async (data) => {
  if (!data.title || !data.title.trim()) throw new Error('Title is required');
  const task = {
    _id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    title: data.title.trim(),
    description: data.description || '',
    status: STATUSES.includes(data.status) ? data.status : 'pending',
    dueDate: data.dueDate || '',
    createdAt: new Date().toISOString(),
  };
  write([...read(), task]);
  return task;
};

export const updateTask = async (id, data) => {
  const tasks = read();
  const index = tasks.findIndex((t) => t._id === id);
  if (index === -1) throw new Error('Task not found');
  const allowed = ['title', 'description', 'status', 'dueDate'];
  allowed.forEach((field) => {
    if (data[field] !== undefined) tasks[index][field] = data[field];
  });
  write(tasks);
  return tasks[index];
};

export const deleteTask = async (id) => {
  write(read().filter((t) => t._id !== id));
  return { message: 'Task removed' };
};

// Alternate names, in case your components use different ones
export const fetchTasks = getTasks;
export const addTask = createTask;
export const editTask = updateTask;
export const removeTask = deleteTask;