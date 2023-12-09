// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');

// router.get('/tasks', taskController.getAllTasks);
// router.post('/tasks', taskController.createTask);
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);

// // New routes for projects
// router.post('/projects', taskController.createProject);
// router.get('/projects', taskController.getAllProjects);
// router.put('/projects/:id', taskController.updateProject);  // New route for updating a project
// router.delete('/projects/:id', taskController.deleteProject);  
// router.get('/tasks/project/:projectId', taskController.getTasksForProject);


// module.exports = router;

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

// New routes for projects
router.post('/projects', taskController.createProject);
router.get('/projects', taskController.getAllProjects);
router.get('/tasks/project/:projectId', taskController.getTasksForProject); // Moved this route up
router.put('/projects/:id', taskController.updateProject);
router.delete('/projects/:id', taskController.deleteProject);

module.exports = router;
