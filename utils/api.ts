export interface MenuItem {
  id: number;
  title: string;
  price: string;
  category: {
    title: string;
  };
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }

    const json = await response.json();
    return json.menu as MenuItem[];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}
