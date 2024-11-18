import { DataProvider } from '@/contexts/DataContext';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
  header: { 
    backgroundColor: Colors.background,
  },
  headerTitle: { fontFamily: "Preahvihear", color: Colors.white },
});

export default function Layout() {
  const [loaded] = useFonts({
    'Preahvihear': require('@/assets/fonts/Preahvihear-Regular.ttf')
  });

  return (<>
    <StatusBar barStyle="dark-content" />
    <DataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ 
          headerShown: true,
          // couleur de fond en noir
          headerStyle: styles.header,
          headerTitle: "The Picker Map",
          headerTitleStyle: styles.headerTitle,
          }} 
        />
      </Stack>
    </DataProvider>
  </>);
}