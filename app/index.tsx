// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getProfile } from '../utils/storage';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const profile = await getProfile();

        if (profile) {
          router.replace('/tabs/home');
        } else {
          router.replace('/onboarding');
        }
      } catch (e) {
        console.error('Error reading onboarding status', e);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
