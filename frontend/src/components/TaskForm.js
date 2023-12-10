import React, { useState } from 'react';

const TaskForm = ({ onCreate, onCancel }) => {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('ToDo');

  const handleCreateTask = () => {
    // Validate form fields, e.g., check if taskName is not empty
    if (!taskName) {
      alert('Task name cannot be empty');
      return;
    }

    const newTask = {
      taskName,
      startDate,
      endDate,
      status,
    };

    onCreate(newTask);

    // Reset form fields after creating the task
    setTaskName('');
    setStartDate('');
    setEndDate('');
    setStatus('ToDo');
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form>
        <div>
          <label>Task Name:</label>
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="InReview">In Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="button" onClick={handleCreateTask}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;




//12/5 9:30