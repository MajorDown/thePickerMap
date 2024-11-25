import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: Colors.background,
    borderTopWidth: 0,
  },
  tab: {},

});

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: Colors.blue ,
      tabBarInactiveTintColor: Colors.white,
      tabBarStyle: styles.tabs,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="NewProduct"
        options={{
          headerShown: false,
          title: "ajout d'un nouveau produit",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="location-arrow" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
