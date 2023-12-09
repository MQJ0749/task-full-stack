// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Model } = require('objection');
// const knex = require('knex');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const knexInstance = knex({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: 'postgres',
//     password: '123456789',
//     database: 'full-stack1',
//   },
// });

// Model.knex(knexInstance);

// const apiRoutes = require('./routes/api');
// app.use('/api', apiRoutes);

// // Run migrations
// knexInstance.migrate.latest().then(() => {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });
// Example in server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const apiRoutes = require('./routes/api');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api', apiRoutes); // Mount the API routes

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123456789',
  port: 5432,
});

// Read and execute SQL scripts
const createTablesScript = fs.readFileSync('./sql/create_tables.sql', 'utf-8');

pool.query(createTablesScript)
  .then(() => {
    console.log('Tables created successfully.');
    startServer();
  })
  .catch((err) => {
    console.error('Error creating tables:', err);
    process.exit(1);
  });

function startServer() {
  // Your routes and other server setup
  const apiRoutes = require('./routes/api');
  app.use('/api', apiRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
