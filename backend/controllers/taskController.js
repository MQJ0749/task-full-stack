// // backend/controllers/taskController.js
const Task = require('../models/Task');
const Project = require('../models/Project');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123456789',
  port: 5432,
});


exports.getAllTasks = async (req, res) => {
  try {
    let query = 'SELECT tasks.*, projects.projectName FROM tasks LEFT JOIN projects ON tasks.projectId = projects.id';

    // If projectId is provided in the query parameters, filter tasks for that project
    const values = [];
    if (req.query.projectId) {
      query += ' WHERE tasks.projectId = $1';
      values.push(req.query.projectId);
    }

    const result = await pool.query(query, values);
    const tasks = result.rows;
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ...
exports.getTasksForProject = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE projectId = $1', [req.params.projectId]);
    const tasks = result.rows;
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// backend/controllers/taskController.js
// ...

exports.createTask = async (req, res) => {
  const { taskName, startDate, endDate, status, projectId } = req.body;

  try {
    // Check if the project with the specified projectId exists
    const projectCheck = await pool.query('SELECT * FROM projects WHERE id = $1', [projectId]);

    if (projectCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Project does not exist' });
    }

    // Project exists, proceed to create the task
    const result = await pool.query('INSERT INTO tasks (taskName, startDate, endDate, status, projectId) VALUES ($1, $2, $3, $4, $5) RETURNING *', [taskName, startDate, endDate, status, projectId]);
    const newTask = result.rows[0];
    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ...



exports.updateTask = async (req, res) => {
  const { taskName, startDate, endDate, status } = req.body;

  try {
    const result = await pool.query('UPDATE tasks SET taskName=$1, startDate=$2, endDate=$3, status=$4 WHERE id=$5 RETURNING *', [taskName, startDate, endDate, status, req.params.id]);
    const updatedTask = result.rows[0];
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createProject = async (req, res) => {
  const { projectName } = req.body;

  try {
    const result = await pool.query('INSERT INTO projects (projectName) VALUES ($1) RETURNING *', [projectName]);
    const newProject = result.rows[0];
    res.json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    const projects = result.rows;
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.updateProject = async (req, res) => {
  const { projectName } = req.body;

  try {
    const result = await pool.query('UPDATE projects SET projectName=$1 WHERE id=$2 RETURNING *', [projectName, req.params.id]);
    const updatedProject = result.rows[0];
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // Delete all tasks associated with the project first
    await pool.query('DELETE FROM tasks WHERE projectId=$1', [req.params.id]);
    
    // Then delete the project
    await pool.query('DELETE FROM projects WHERE id=$1', [req.params.id]);
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.getTasksForProject = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM tasks WHERE projectId = $1', [req.params.projectId]);
//     const tasks = result.rows;
//     res.json(tasks);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };