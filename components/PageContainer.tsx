import {View, ScrollView, Text, StyleSheet} from 'react-native';
import { PropsWithChildren } from 'react';
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        width: '100%',
        height: '100%',
    },
    title: {
        fontFamily: "Preahvihear",
        textAlign: 'center',
        color: Colors.white,
        fontSize: 15,
    },
    content: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

type PageContainerProps = PropsWithChildren<{
    title?: string;
}>;

const PageContainer = (props: PageContainerProps): JSX.Element => {
    return (<ScrollView style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.content}>
            {props.children}
        </View>
    </ScrollView>
    );
}

export default PageContainer;