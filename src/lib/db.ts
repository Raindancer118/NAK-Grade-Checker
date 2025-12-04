import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('grades.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_name TEXT NOT NULL,
    grade TEXT,
    exam_date TEXT,
    credits INTEGER,
    status TEXT,
    UNIQUE(module_name, exam_date)
  );
`);

export default db;
