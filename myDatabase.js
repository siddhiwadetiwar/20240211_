/**the requirement was to create a file system where we have 
 * database equivalent to a folder, table resembling a file and
 * records indicating lines in a file. On this file system apply
 * CRUD operations.
 */

const fs = require('fs');
const path = require('path');

// Define the base path for the databases
const basePath = '/Users/siddhiwadetiwar/Desktop/';

// Function to create a new database
function createDatabase(databaseName) {
  const databasePath = path.join(basePath, databaseName);

  fs.mkdir(databasePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Database '${databaseName}' created successfully.`);
  });
}

// Function to create a new table (file) in a database
function createTable(databaseName, tableName) {
  const tablePath = path.join(basePath, databaseName, tableName);

  fs.writeFile(tablePath, '', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Table '${tableName}' created in '${databaseName}' database.`);
  });
}

// Function to insert a new record (line) into a table
function insertRecord(databaseName, tableName, record) {
  const tablePath = path.join(basePath, databaseName, tableName);

  fs.appendFile(tablePath, record + '\n', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Record added to '${tableName}' table in '${databaseName}' database.`);
  });
}

// Function to read all records from a table
function readRecords(databaseName, tableName) {
  const tablePath = path.join(basePath, databaseName, tableName);

  fs.readFile(tablePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const records = data.split('\n').filter(Boolean);
    console.log(`Records in '${tableName}' table in '${databaseName}' database:`);
    records.forEach((record, index) => {
      console.log(`  ${index + 1}. ${record}`);
    });
  });
}

// Function to update a record in a table
function updateRecord(databaseName, tableName, lineNumber, newRecord) {
  const tablePath = path.join(basePath, databaseName, tableName);

  fs.readFile(tablePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const records = data.split('\n');
    if (lineNumber >= 0 && lineNumber < records.length) {
      records[lineNumber] = newRecord;
      const updatedData = records.join('\n');

      fs.writeFile(tablePath, updatedData, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Record at line ${lineNumber + 1} updated in '${tableName}' table.`);
      });
    } else {
      console.error(`Invalid line number ${lineNumber + 1}.`);
    }
  });
}

// Function to delete a record from a table
function deleteRecord(databaseName, tableName, lineNumber) {
  const tablePath = path.join(basePath, databaseName, tableName);

  fs.readFile(tablePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const records = data.split('\n');
    if (lineNumber >= 0 && lineNumber < records.length) {
      records.splice(lineNumber, 1);
      const updatedData = records.join('\n');

      fs.writeFile(tablePath, updatedData, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Record at line ${lineNumber + 1} deleted from '${tableName}' table.`);
      });
    } else {
      console.error(`Invalid line number ${lineNumber + 1}.`);
    }
  });
}

// Example usage:

//Create a new database
createDatabase('myDatabase');

//Create a new table in the database
createTable('myDatabase', 'myTable');

//Insert records into the table
insertRecord('myDatabase', 'testTable', 'Record 1');
insertRecord('myDatabase', 'testTable', 'Record 2');
insertRecord('myDatabase', 'testTable', 'Record 3');

// Read all records from the table
readRecords('myDatabase', 'myTable');

// Update a record in the table
updateRecord('myDatabase', 'myTable', 1, 'Updated Record 2');

// Read all records after the update
readRecords('myDatabase', 'myTable');

// Delete a record from the table
deleteRecord('myDatabase', 'myTable', 0);

// Read all records after the deletion
readRecords('myDatabase', 'myTable');