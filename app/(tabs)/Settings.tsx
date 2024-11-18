import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Settings = ():JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Tab Settings</Text>
    </View>
  );
}

export default Settings;

