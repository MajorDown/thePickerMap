import { View, Text, StyleSheet } from 'react-native';
import MapTest from '@/components/MapTest';
import PageContainer from '@/components/PageContainer';

const Home = ():JSX.Element => {
    return (<PageContainer title="Home">
        <MapTest />
    </PageContainer>);
}

export default Home;

