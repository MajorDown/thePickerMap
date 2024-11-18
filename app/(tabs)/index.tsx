import { View, Text, StyleSheet } from 'react-native';
import MapTest from '@/components/MapTest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = ():JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
      <MapTest />

    </View>
  );
}

export default Home;

