import React, { useState } from 'react';
import { addTask, updateTask } from '../api';

const TaskForm = ({ task = {}, onUpdate }) => {
  const [taskName, setTaskName] = useState(task.name || '');
  const [completed, setCompleted] = useState(task.completed || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { name: taskName, completed };

    if (task._id) {
      await updateTask(task._id, taskData);
    } else {
      await addTask(taskData);
    }
    onUpdate();
    setTaskName('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{task._id ? 'Edit Task' : 'Add Task'}</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
