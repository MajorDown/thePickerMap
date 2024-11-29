import { useEffect, useState } from "react";
import WebMap from "@/components/WebMap";
import PageContainer from "@/components/PageContainer";
import { PickDate, PickedProduct, Position, ProductType, ProductTypes } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import NameInput from "@/components/NameInput";
import InfosInput from "@/components/InfosInput";
import { useDataContext } from "@/contexts/DataContext";
import ProductTypesInput from "@/components/ProductTypesInput";
import DateInput from "@/components/DateInput";
import { generateProductId } from "@/tools/generateProductId";
import ActionBtn from "@/components/ActionBtn";
import { router } from 'expo-router';

const NewProduct = (): JSX.Element => {
    const { position, error } = useUserLocation();
    const { pickedProducts, updatePickedProducts } = useDataContext();
    const MarkersList = pickedProducts.map((product) => ({ 
        lat: product.position.lat, 
        lon: product.position.lon, 
        name: product.name, 
        informations: product.informations ,
        type: product.type
    }));

    const [draggedPosition, setDraggedPosition] = useState<Position | null>(null);
    const [name, setName] = useState<string>("");
    const [infos, setInfos] = useState<string>("");
    const [productType, setProductType] = useState<ProductType>(ProductTypes[0]);
    const [date, setDate] = useState<PickDate>();

    useEffect(() => {
        if (position && !draggedPosition) setDraggedPosition(position);
    }, [position]);

    const handleSave = () => {
        console.log("Enregistrement du produit...");
        if (!date) return;
        if (!name) return;
        if (!productType) return;
        if (!draggedPosition) return;

        const id = generateProductId();
        const newPickedProduct = { 
            id, 
            name, 
            type: productType, 
            position: draggedPosition, 
            informations: infos, 
            date 
        } as PickedProduct;
        updatePickedProducts([...pickedProducts, newPickedProduct]);
        setName("");
        setInfos("");
        setProductType(ProductTypes[0]);
        setDraggedPosition(position);
        router.push("/(tabs)");
    }

    return (<PageContainer title="Enregistrez Votre Cuillette">
        {error && <p>{error}</p>} 
        <DateInput date={date} onDateChange={(value: PickDate) => setDate(value)} />
        <NameInput value={name} onChange={(value: string) => setName(value)} />
        <ProductTypesInput mode={"create"} value={productType} onChange={(value: ProductType) => setProductType(value)} />
        <InfosInput value={infos} onChange={(value: string) => setInfos(value)} />
        {position && pickedProducts && draggedPosition && (<WebMap
            wantCursor      
            markers={MarkersList} 
            initalPosition={position}
            onPositionChange={(region) => setDraggedPosition({ lat: region.lat, lon: region.lon })}
        />)}
        <ActionBtn onPress={() => handleSave()} label="Enregistrer" />
    </PageContainer>);
};

export default NewProduct;
