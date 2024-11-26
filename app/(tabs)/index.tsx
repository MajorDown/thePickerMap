import { useEffect, useState } from "react";
import Map from "@/components/Map";
import PageContainer from "@/components/PageContainer";
import { PickDate, Position, ProductType, ProductTypes } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import NameInput from "@/components/NameInput";
import InfosInput from "@/components/InfosInput";
import { useDataContext } from "@/contexts/DataContext";
import ProductTypesInput from "@/components/ProductTypesInput";
import DateInput from "@/components/DateInput";

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

    return (<PageContainer title="Vos Cuillettes">
        {error && <p>{error}</p>} 
        {position && draggedPosition && (<Map
            wantCursor      
            markers={Markers} 
            initalPosition={position}
            onPositionChange={(region) => setDraggedPosition({ lat: region.lat, lon: region.lon })}
        />)}
    </PageContainer>);
};

export default Home;
