import { DataProvider } from '@/contexts/DataContext';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

export default function Layout() {
  const [loaded] = useFonts({
    'Preahvihear': require('@/assets/fonts/Preahvihear-Regular.ttf')
  });

  return (<>
    <StatusBar barStyle="dark-content" />
    <DataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DataProvider>
  </>);
}