// task.js
const { Model } = require('objection');

class Task extends Model {
  static get tableName() {
    return 'tasks'; // Specify the table name
  }

  // Define columns and other configuration as needed
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        taskName: { type: 'string' },
        startDate: { type: 'date' },
        endDate: { type: 'date' },
        status: { type: 'string' },
        projectId: { type: 'integer' }, // Add the foreign key
        // Add more columns as needed
      },
    };
  }
}

module.exports = Task;
