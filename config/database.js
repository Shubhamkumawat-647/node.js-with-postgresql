// config/database.js
const { Sequelize } = require('sequelize');
const { Client } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: 'postgres', // Default database to connect for creating the target DB
};

const createDatabaseIfNotExists = async () => {
  const client = new Client(config);
  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}';`
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
      console.log(`Database ${process.env.DB_NAME} created successfully.`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists.`);
    }
  } catch (err) {
    console.error('Error checking/creating database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
};

// Declare sequelize only once
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    define: {
        schema: process.env.DB_SCHEMA,  // Default schema for all models
      },
  }
);

const connectDB = async () => {
  await createDatabaseIfNotExists();  // Create the database if it doesn't exist
  try {
    await sequelize.authenticate();  // Authenticate the connection
    console.log('Connection has been established successfully.');
    
    await sequelize.createSchema(process.env.DB_SCHEMA, { ifNotExists: true });
    console.log(`Schema "${process.env.DB_SCHEMA}" ensured.`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
