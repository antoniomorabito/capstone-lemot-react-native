// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#495E57',
        tabBarInactiveTintColor: 'gray',
       tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'home') {
                iconName = 'home';
            } else if (route.name === 'profile') {
                iconName = 'person';
            } else {
                iconName = 'help'; // default fallback!
            }

            return <Ionicons name={iconName} size={size} color={color} />;
            },
      })}
    />
  );
}
