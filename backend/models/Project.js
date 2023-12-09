// project.js
const { Model } = require('objection');

class Project extends Model {
  static get tableName() {
    return 'projects'; // Specify the table name
  }

  // Define columns and other configuration as needed
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        projectName: { type: 'string' },
        // Add more columns as needed
      },
    };
  }
}

module.exports = Project;
