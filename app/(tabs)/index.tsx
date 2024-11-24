import { useEffect, useState } from "react";
import Map from "@/components/Map";
import PageContainer from "@/components/PageContainer";
import { PickDate, Position, ProductType, ProductTypes } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import NameInput from "@/components/NameInput";
import InfosInput from "@/components/InfosInput";
import SelectInput from "@/components/SelectInput";
import { useDataContext } from "@/contexts/DataContext";
import ProductTypesInput from "@/components/ProductTypesInput";
import NumberInput from "@/components/NumberInput";
import DateInput from "@/components/DateInput";

const styles = StyleSheet.create({
    locationMarker: {
        position: "absolute",
        bottom: "50%",
        transform: [{ translateY: 0}, { translateX: 15 }],
        right: "50%",
        zIndex: 999,
    }
})

const Markers = [
  {
    lat: 37.78825,
    lon: -122.4324,
    name: "San Francisco",
    informations: "The best city in the world",
  },
  {
    lat: 48.8566,
    lon: 2.3522,
    name: "Paris",
    informations: "The city of love",
  },
  {
    lat: 51.5074,
    lon: -0.1278,
    name: "London",
    informations: "The city of the queen",
  },
  {
    lat: 40.7128,
    lon: -74.006,
    name: "New York",
    informations: "The city that never sleeps",
  },
];

const Home = (): JSX.Element => {
    const { position, error } = useUserLocation();
    const { pickedProducts } = useDataContext();

    const [draggedPosition, setDraggedPosition] = useState<Position | null>(null);
    const [name, setName] = useState<string>("");
    const [infos, setInfos] = useState<string>("");
    const [productType, setProductType] = useState<ProductType>(ProductTypes[0]);
    const [date, setDate] = useState<PickDate>({ day: "01", month: "01", year: "2024" });

    useEffect(() => {
        if (position && !draggedPosition) setDraggedPosition(position);
    }, [position]);

    return (<PageContainer title="Enregistrez Vos Cuillettes">
        {error && <p>{error}</p>}
        <NameInput value={name} onNameChange={(newValue) => setName(newValue)}/>
        <ProductTypesInput value={productType} onChange={(newValue: ProductType) => setProductType(newValue as ProductType)}/>
        <InfosInput value={infos} onInfosChange={(newValue) => setInfos(newValue)}/>
        <DateInput date={date} onDateChange={(value) => setDate(value)}/>   

        {position && draggedPosition && (<>
            <Map
                markers={Markers} 
                initalPosition={position}
                onPositionChange={(region) => setDraggedPosition({ lat: region.lat, lon: region.lon })}
            />
            <View style={styles.locationMarker}>
                <FontAwesome name="mouse-pointer" color={Colors.white} size={32} />
            </View>
        </>)}
    </PageContainer>);
};

export default Home;
