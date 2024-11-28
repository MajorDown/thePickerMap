import { useEffect, useState } from "react";
import Map from "@/components/Map";
import WebMap from "@/components/WebMap";
import PageContainer from "@/components/PageContainer";
import { Position } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import { useDataContext } from "@/contexts/DataContext";

const Home = (): JSX.Element => {
    const { position, error } = useUserLocation();
    const { pickedProducts } = useDataContext();
    const MarkersList = pickedProducts.map((product) => ({ 
        lat: product.position.lat, 
        lon: product.position.lon, 
        name: product.name, 
        informations: product.informations ,
        type: product.type
    }));

    const [draggedPosition, setDraggedPosition] = useState<Position | null>(null);

    useEffect(() => {
        if (position && !draggedPosition) setDraggedPosition(position);
    }, [position]);

    return (<PageContainer title="Vos Cuillettes">
        {error && <p>{error}</p>}
        {position && draggedPosition && (<WebMap
            wantCursor      
            markers={MarkersList} 
            initalPosition={position}
            onPositionChange={(region) => setDraggedPosition({ lat: region.lat, lon: region.lon })}
        />)}
    </PageContainer>);
};

export default Home;
