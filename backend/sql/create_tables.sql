-- create_tables.sql

-- Create Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    projectName VARCHAR(255) NOT NULL
);

-- Create Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    taskName VARCHAR(255) NOT NULL,
    startDate DATE,
    endDate DATE,
    status VARCHAR(50),
    projectId INTEGER REFERENCES projects(id)
);
