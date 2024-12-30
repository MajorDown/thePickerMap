import {View, Text, TextInput, StyleSheet} from 'react-native';
import GlobalsStyles from '@/constants/Styles';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        margin: 5
    },
    input: {
        width: 300
    }
});

type InfosInputProps = {
    value: string;
    onChange: (name: string) => void;
}

/**
 * @description - Champ pour ajouter des informations
 * @param {(name: string) => void} props.onChange - Fonction appelée lorsqu'une valeur est entrée
 * @returns {JSX.Element}
 */
const InfosInput = (props: InfosInputProps): JSX.Element => {
    return (<View style={styles.container}>
        <Text style={GlobalsStyles.text}>Donnez plus d'information ici :</Text>
        <TextInput
            style={[GlobalsStyles.input, styles.input]}
            value={props.value}
            placeholder="Trouvé sur une pente raide, à l'ombre, etc..."
            onChangeText={text => props.onChange(text)}
            maxLength={300}
            multiline={true}  
            numberOfLines={2}      
        />
    </View>)
}

export default InfosInput;