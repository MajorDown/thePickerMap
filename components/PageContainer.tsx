import {View, Text, StyleSheet} from 'react-native';
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
        padding: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

type PageContainerProps = PropsWithChildren<{
    title?: string;
}>;

/**
 * @description - Conteneur pour les pages
 * @param {string} [props.title] - Titre de la page
 * @returns {JSX.Element}
 */
const PageContainer = (props: PageContainerProps): JSX.Element => {
    return (<View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.content}>
            {props.children}
        </View>
    </View>
    );
}

export default PageContainer;