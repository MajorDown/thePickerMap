import PageContainer from '@/components/PageContainer';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Settings = ():JSX.Element => {
  return (<PageContainer title="Settings">
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  </PageContainer>);
}

export default Settings;

