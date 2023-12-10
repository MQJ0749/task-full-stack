import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {


  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.taskname); // Change to taskname

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Validate editedTaskName
    if (!editedTaskName) {
      alert('Task name cannot be empty');
      return;
    }

    const updatedTask = { ...task, taskname: editedTaskName }; // Change to taskname
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={editedTaskName} onChange={(e) => setEditedTaskName(e.target.value)} />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        // <div>
        //   <p>Task Name: {task.taskname}</p> {/* Change to taskname */}
        //   <p>Start Date: {task.startdate}</p>
        //   <p>End Date: {task.enddate}</p>
        //   <p>Status: {task.status}</p>
        //   <button onClick={handleUpdateClick}>Edit</button>
        //   <button onClick={handleDeleteClick}>Delete</button>
        // </div>
        <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
  <p><strong>Task Name:</strong> {task.taskname}</p>
  <p><strong>Start Date:</strong> {formatDate(task.startdate)}</p>
  <p><strong>End Date:</strong> {formatDate(task.enddate)}</p>
  <p><strong>Status:</strong> {task.status}</p>
  <button onClick={handleUpdateClick}>Edit</button>
  <button onClick={handleDeleteClick}>Delete</button>
</div>

      )}
    </div>
  );
};

export default TaskItem;
