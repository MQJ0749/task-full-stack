import React, { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import api from '../services/api'; // Import the function directly
//
const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    ToDo: [],
    InProgress: [],
    InReview: [],
    Completed: [],
  });
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await api.get('/projects');
        setProjects(projectsResponse.data);
        if (selectedProject) {
          const tasksResponse = await api.get(`/tasks/project/${selectedProject.id}`);
          updateTasksState(tasksResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedProject]);

  const updateTasksState = (newTasks) => {
    // console.log('New Tasks:', newTasks);
  
    setTasks((prevTasks) => {
      console.log('Previous Tasks:', prevTasks);
  
      // Group tasks by status using reduce
      const updatedTasks = newTasks.reduce((acc, task) => {
        const { status } = task;
        const normalizedStatus = status.replace(/\s/g, ''); // Remove spaces
        acc[normalizedStatus] = [...(acc[normalizedStatus] || []), task];
        return acc;
      }, {});
  
      console.log('Updated Tasks:', updatedTasks);
  
      // Combine the arrays for InProgress
      const mergedInProgress = [
        ...(prevTasks.InProgress || []),
        ...(updatedTasks.InProgress || []),
      ];
  
      return {
        ...prevTasks,
        ...updatedTasks,
        // InProgress: mergedInProgress,
      };
    });
  };
  
  const handleTaskUpdate = async (updatedTask) => {
    try {
      const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [updatedTask.status]: prevTasks[updatedTask.status].map((task) =>
          task.id === updatedTask.id ? response.data : task
        ),
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const handleTaskDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
  
        // Iterate over status keys (ToDo, InProgress, InReview, Completed)
        Object.keys(updatedTasks).forEach((status) => {
          updatedTasks[status] = updatedTasks[status].filter((task) => task.id !== taskId);
        });
  
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  const handleTaskCreate = async (newTask) => {
    try {
      const response = await api.post('/tasks', { ...newTask, projectId: selectedProject.id });
  
      // Omit the 'id' key from the response data
      const { id, ...taskData } = response.data;
  
      // Update the corresponding status array based on the new task's status
      setTasks((prevTasks) => ({
        ...prevTasks,
        [taskData.status]: [...prevTasks[taskData.status], taskData],
      }));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  

  const handleProjectCreate = async (newProject) => {
    try {
      const response = await api.post('/projects', { projectName: newProject.title });
      setProjects((prevProjects) => [...prevProjects, response.data]);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };


  const handleProjectSelect = async (project) => {
    console.log('Project selected with ID:', project.id);
  
    // Check if projects are available
    if (projects && projects.length > 0) {
      setSelectedProject(project);
  
      try {
        const tasksResponse = await api.get(`/tasks/project/${project.id}`);
        console.log('Full Response:', tasksResponse);
        console.log('Tasks Data Type:', typeof tasksResponse.data);
        console.log('Tasks Data Length:', tasksResponse.data.length);
  
        if (Array.isArray(tasksResponse.data)) {
          console.log('Tasks Data:', tasksResponse.data);
  
          // Create an object to hold the tasks for different columns
          const updatedTasks = {
            ToDo: [],
            InProgress: [],
            InReview: [],
            Completed: [],
          };
  
          // Group tasks by status using reduce
          tasksResponse.data.forEach((task) => {
            const normalizedStatus = task.status.replace(/\s/g, ''); // Remove spaces
            updatedTasks[normalizedStatus].push(task);
          });
  
          // Update the state with the new tasks
          setTasks(updatedTasks);
        } else {
          console.error('Invalid tasks response:', tasksResponse);
        }
      } catch (error) {
        console.error('Error fetching tasks for project:', error);
      }
    } else {
      console.error('Projects not available');
    }
  };
  
//   return (
//     <div style={{ background: '#fff', padding: '20px' }}>
//       <h1 style={{ color: '#000080' }}>Task Manager</h1>
//       <div style={{ display: 'flex' }}>
//         <TaskColumn
//           title="Projects"
//           projects={projects}
//           onSelect={handleProjectSelect}
//           onCreate={handleProjectCreate}
//         />
//         <TaskColumn
//           title="To Do"
//           tasks={tasks.ToDo}
//           onCreate={handleTaskCreate}
//           onUpdate={handleTaskUpdate}
//           onDelete={handleTaskDelete}
//         />
//         <TaskColumn
//           title="InProgress"
//           tasks={tasks.InProgress}
//           onCreate={handleTaskCreate}
//           onUpdate={handleTaskUpdate}
//           onDelete={handleTaskDelete}
//         />
//         <TaskColumn
//           title="In Review"
//           tasks={tasks.InReview}
//           onCreate={handleTaskCreate}
//           onUpdate={handleTaskUpdate}
//           onDelete={handleTaskDelete}
//         />
//         <TaskColumn
//           title="Completed"
//           tasks={tasks.Completed}
//           onCreate={handleTaskCreate}
//           onUpdate={handleTaskUpdate}
//           onDelete={handleTaskDelete}
//         />
//       </div>
//     </div>
//   );
// };

// export default TaskBoard;

return (
  <div style={{ background: '#fff', padding: '20px' }}>
    <h1 style={{ color: '#000080' }}>Task Manager</h1>
    <div style={{ display: 'flex' }}>
      <TaskColumn
        title="Projects"
        projects={projects}
        onSelect={handleProjectSelect}
        onCreate={handleProjectCreate}
      />
      <TaskColumn
        title="To Do"
        tasks={tasks.ToDo}
        onCreate={handleTaskCreate}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
        columnStyle={{ background: '#000080', color: '#FFFFFF' }} // Customize column style
        buttonStyle={{ background: '#000080', color: '#FFFFFF', width: '100%' }} // Customize button style
      />
      <TaskColumn
        title="InProgress"
        tasks={tasks.InProgress}
        onCreate={handleTaskCreate}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
        columnStyle={{ background: '#FF69B4', color: '#FFFFFF' }} // Customize column style
        buttonStyle={{ background: '#FF69B4', color: '#FFFFFF', width: '100%' }} // Customize button style
      />
      <TaskColumn
        title="In Review"
        tasks={tasks.InReview}
        onCreate={handleTaskCreate}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
        columnStyle={{ background: 'lightblue', color: '#000080' }} // Customize column style
        buttonStyle={{ background: 'lightblue', color: '#000080', width: '100%' }} // Customize button style
      />
      <TaskColumn
        title="Completed"
        tasks={tasks.Completed}
        onCreate={handleTaskCreate}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
        columnStyle={{ background: 'green', color: '#FFFFFF' }} // Customize column style
        buttonStyle={{ background: 'green', color: '#FFFFFF', width: '100%' }} // Customize button style
      />
    </div>
  </div>  
);
};

export default TaskBoard;
