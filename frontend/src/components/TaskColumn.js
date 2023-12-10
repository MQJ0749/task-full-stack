import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import api from '../services/api';

const TaskColumn = ({ title, tasks, onSelect, onUpdate, onDelete, onCreate, projects, handleTaskCreate }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState('');
  const [newProjectName, setNewProjectName] = useState('');

  const cursorStyle = { cursor: 'pointer' };

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleCancelAddTask = () => {
    setIsAddingTask(false);
  };

  const handleAddProjectClick = () => {
    setIsAddingProject(true);
  };

  const handleCancelAddProject = () => {
    setIsAddingProject(false);
  };

  const handleEditProjectClick = () => {
    setIsEditingProject(true);
    setEditedProjectName(title); // Set the current project name for editing
  };
  

  const handleSaveProjectClick = () => {
    // Validate project name
    if (!editedProjectName && !newProjectName) {
      alert('Project name cannot be empty');
      return;
    }

    if (isEditingProject) {
      onUpdate({ title: editedProjectName });
      setIsEditingProject(false);
    } else {
      onCreate({ title: newProjectName });
      setNewProjectName(''); // Clear the new project name field
      setIsAddingProject(false);
    }
  };

  const handleCancelEditProject = () => {
    setIsEditingProject(false);
  };

  const handleProjectSelect = (projectId) => {
    console.log('Project selected with ID:', projectId);

    // Check if projects are available
    if (projects && projects.length > 0) {
      const selectedProject = projects.find((project) => project.id === projectId);

      // Check if selectedProject is available
      if (selectedProject) {
        console.log('Selected project:', selectedProject);
        onSelect(selectedProject);
      } else {
        console.error('Selected project not found with ID:', projectId);
      }
    } else {
      console.error('Projects not available');
    }
  };

  return (
    <div style={{ flex: 1, marginRight: '20px', borderRight: '2px solid lightblue', paddingRight: '20px' }}>
      <h2 onClick={title === 'Projects' ? null : handleProjectSelect} style={{ cursor: 'pointer' }}>
        {title}
      </h2>
      <div>
        {title === 'Projects'
          ? projects.map((project) => (
              <div key={project.id} style={cursorStyle} onClick={() => onSelect(project)}>
                {project.projectname}
              </div>
            ))
          : tasks.map((task) => (
              <div key={task.id}>
                {/* <TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} /> */}
                {/* Render additional task details here */}
                {/* <p>Task Name: {task.taskname}</p>
                <p>Start Date: {task.startdate}</p>
                <p>End Date: {task.enddate}</p>
                <p>Status: {task.status}</p> */}
                {/* Add more details as needed */}
              </div>
            ))}
      </div>

      {title === 'Projects' && (
        <React.Fragment>
          {isAddingProject ? (
            <div>
              <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
              <button onClick={handleSaveProjectClick}>Save</button>
              <button onClick={handleCancelAddProject}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleAddProjectClick}>Add Project</button>
          )}
        </React.Fragment>
      )}

      {isEditingProject ? (
        <div>
          <input type="text" value={editedProjectName} onChange={(e) => setEditedProjectName(e.target.value)} />
          <button onClick={handleSaveProjectClick}>Save</button>
          <button onClick={handleCancelEditProject}>Cancel</button>
        </div>
      ) : null}

      {title !== 'Projects' && (
        <div>
          {isAddingTask ? (
            <TaskForm onCancel={handleCancelAddTask} onCreate={onCreate} />
          ) : (
            <React.Fragment>
              <button onClick={handleAddTaskClick}>Add Task</button>
              <div>
                {/* Render tasks related to the current column status */}
                {tasks.map((task) => (
                  <div key={task.id}>
                    <TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} />
                    {/* Render additional task details here */}
                    {/* <p>Task Name2: {task.taskname}</p>
                    <p>Start Date: {task.startdate}</p>
                    <p>End Date: {task.enddate}</p>
                    <p>Status: {task.status}</p> */}
                    {/* Add more details as needed */}
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskColumn;

