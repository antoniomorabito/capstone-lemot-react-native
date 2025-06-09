import * as SQLite from 'expo-sqlite';

interface Profile {
  name: string;
  email: string;
}

// Open the database
const db = SQLite.openDatabaseSync('little_lemon.db');

// Initialize the database and create tables if they don't exist
export async function initializeDatabase(): Promise<void> {
  try {
    // Use withTransactionAsync for multiple statements
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS profile (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE
        );
      `);
    });
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export async function saveProfile(profile: Profile): Promise<void> {
  try {
    await initializeDatabase();

    const result = await db.runAsync(
      'INSERT OR REPLACE INTO profile (name, email) VALUES (?, ?);',
      [profile.name, profile.email]
    );

    if (result.changes === 0) {
      throw new Error('No rows affected');
    }

    console.log('Profile saved successfully');
  } catch (error) {
    console.error('Error in saveProfile:', error);
    throw error;
  }
}

// Additional utility functions
export async function getProfile(): Promise<Profile | null> {
  try {
    const result = await db.getAllAsync<Profile>(
      'SELECT name, email FROM profile LIMIT 1;',
      []
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw error;
  }
}

export async function deleteProfile(): Promise<void> {
  try {
    const result = await db.runAsync('DELETE FROM profile;', []);
    if (result.changes === 0) {
      throw new Error('No profile to delete');
    }
  } catch (error) {
    console.error('Error in deleteProfile:', error);
    throw error;
  }
}