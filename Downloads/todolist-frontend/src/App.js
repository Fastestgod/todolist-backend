import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { fetchTasks, addTask, updateTask, deleteTask } from './api'; // Assuming the api.js file is in the same folder

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      const task = { title: newTask, completed: false };
      const response = await addTask(task);
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (taskId, currentTitle) => {
    setEditTaskId(taskId);
    setEditTaskTitle(currentTitle);
  };

  const handleSaveEdit = async () => {
    if (!editTaskTitle) return;
    try {
      const updatedTask = { title: editTaskTitle, completed: false };
      const response = await updateTask(editTaskId, updatedTask);
      setTasks(tasks.map((task) => (task._id === editTaskId ? response.data : task)));
      setEditTaskId(null);
      setEditTaskTitle('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCompleteTask = async (taskId, completed) => {
    try {
      const updatedTask = { completed: !completed }; // Toggle completed status
      const response = await updateTask(taskId, updatedTask);
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      {editTaskId && (
        <div>
          <input
            type="text"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            placeholder="Edit task title"
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.completed ? '(Completed)' : '(Pending)'}
            <button onClick={() => handleEditTask(task._id, task.title)}>Edit</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            <button onClick={() => handleCompleteTask(task._id, task.completed)}>
              {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
