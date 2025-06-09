import * as SQLite from 'expo-sqlite';

interface Profile {
  name: string;
  email: string;
}
interface MenuItem {
  id: number;
  title: string;
  price: string;
  category: string;
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

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS menuitems (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          price TEXT NOT NULL,
          category TEXT NOT NULL
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

export function saveMenuItems(menuItems: MenuItem[]) {
  db.withTransactionAsync(async () => {
    const query = `INSERT OR REPLACE INTO menuitems(id, title, price, category) VALUES (?, ?, ?, ?);`;
    for (const item of menuItems) {
      await db.runAsync(query, [item.id, item.title, item.price, item.category]);
    }
    console.log('Menu items saved');
  });
}

export async function filterByQueryAndCategories(
  query: string,
  activeCategories: string[]
): Promise<MenuItem[]> {
  return new Promise((resolve, reject) => {
    const likeQuery = `%${query.toLowerCase()}%`;
    const placeholders = activeCategories.map(() => '?').join(', ');
    const sql = `SELECT * FROM menuitems WHERE LOWER(title) LIKE ? AND category IN (${placeholders})`;

    db.withTransactionAsync(async () => {
      try {
        const result = await db.getAllAsync<MenuItem>(sql, [likeQuery, ...activeCategories]);
        resolve(result);
      } catch (error) {
        console.error('Filter query failed', error);
        reject(error);
      }
    });
  });
}