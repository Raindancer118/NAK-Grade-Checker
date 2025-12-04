import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('grades.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS grades_v2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_name TEXT NOT NULL,
    grade TEXT,
    occurrence_index INTEGER,
    status TEXT,
    updated_at TEXT,
    UNIQUE(module_name, occurrence_index)
  );

  CREATE TABLE IF NOT EXISTS system_status (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TEXT
  );

  CREATE TABLE IF NOT EXISTS app_state (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`
);

export default db;
