import { Stack } from 'expo-router/stack';
import { StatusBar } from 'react-native';

export default function Layout() {
  return (<>
    <StatusBar barStyle="light-content" />
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  </>
  );
}