import { Pool } from "pg";

// You can set these in a .env file at your project root:
// PGHOST=your_db_host
// PGUSER=your_db_user
// PGPASSWORD=your_db_password
// PGDATABASE=your_db_name
// PGPORT=5432

// Optionally, load .env variables (uncomment if using dotenv):
// import dotenv from "dotenv";
// dotenv.config();


const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "your_db_user",
  password: process.env.DB_PASSWORD || "your_db_password",
  database: process.env.DB_NAME || "your_db_name",
  port: Number(process.env.DB_PORT) || 5432,
  // ssl: { rejectUnauthorized: false }, // Uncomment for cloud DBs if needed
};

console.log("Connecting to PostgreSQL with config:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
});

const pool = new Pool(dbConfig);

export default pool;
