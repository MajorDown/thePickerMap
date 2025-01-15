import { Image, View, Text, StyleSheet } from 'react-native';
import ActionBtn from "./ActionBtn"
import MessageModal from "./MessageModal"
import { PickedProduct } from '@/constants/Types';
import color from '@/constants/Colors';

const styles = StyleSheet.create({
    text: {
        color: color.white,
    }
})

type ProductModalProps = {
    product: PickedProduct
    isVisible: boolean
    setIsVisible: (visible: boolean) => void
}

/*
* @description Modal pour afficher les infos d'un produit
* @params {boolean} props.product
* @params {boolean} props.isVisible
* @params {function} props.setIsVisible
* @returns {JSX.Element}
* **/
const ProductModal = (props: ProductModalProps):JSX.Element => {

    return (
        <MessageModal 
        visible={props.isVisible}
        onClose={() => props.setIsVisible(false)}
    >
        <Text>Cueillette du {props.product.date.day.toString()}/{props.product.date.month.toString()}/{props.product.date.year.toString()}</Text>
        <View>
            <Text>{props.product.name}</Text>
            <Text style={styles.text}>type : {props.product.type}</Text>
            <Text style={styles.text}>description:</Text>
            <Text style={styles.text}>"{props.product.informations}"</Text>
            <Text style={styles.text}>coordonnées :</Text>
            <Text style={styles.text}>latitude : {props.product.position.lat}</Text>
            <Text style={styles.text}>longitude : {props.product.position.lon}</Text>
        </View>
        <ActionBtn label="Fermer" onPress={() => props.setIsVisible(false)} />
    </MessageModal>
    )
}

export default ProductModal;