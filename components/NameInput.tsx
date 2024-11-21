import {View, Text, TextInput, StyleSheet} from 'react-native';
import GlobalsStyles from '@/constants/Styles';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        margin: 5
    }, 
    input: {
        width: 200
    }
});

type NameInputProps = {
    value: string;
    onNameChange: (name: string) => void;
}

const NameInput = (props: NameInputProps): JSX.Element => {
    return (<View style={styles.container}>
        <Text style={GlobalsStyles.text}>Qu'avez-vous trouvé ?</Text>
        <TextInput
            style={[GlobalsStyles.input, styles.input]}
            value={props.value}
            placeholder="Prunelle, Ail des ours, etc..."
            onChangeText={text => props.onNameChange(text)}
            maxLength={30}
        />
    </View>)
}

export default NameInput;