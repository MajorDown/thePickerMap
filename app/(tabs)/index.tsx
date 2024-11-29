import { useEffect, useMemo, useState } from "react";
import WebMap from "@/components/WebMap";
import PageContainer from "@/components/PageContainer";
import { Position, ProductType } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import { useDataContext } from "@/contexts/DataContext";
import ProductTypesInput from "@/components/ProductTypesInput";

const Home = (): JSX.Element => {
  const { position, error } = useUserLocation();
  const { pickedProducts } = useDataContext();

  const [selectedProductType, setSelectedProductType] = useState<ProductType | "">("");

  // Utiliser useMemo pour mémoriser les marqueurs et les recalculer quand selectedProductType change
  const markers = useMemo(() => {
    const filteredProducts = pickedProducts.filter((product) => {
      if (!selectedProductType) return true;
      return product.type === selectedProductType;
    });
    return filteredProducts.map((product) => ({
      lat: product.position.lat,
      lon: product.position.lon,
      name: product.name,
      informations: product.informations,
      type: product.type,
    }));
  }, [pickedProducts]);

  const [draggedPosition, setDraggedPosition] = useState<Position | null>(null);

  useEffect(() => {
      if (position && !draggedPosition) setDraggedPosition(position);
  }, [position]);

  return (<PageContainer title="Vos Cuillettes">
      {error && <p>{error}</p>}
      <ProductTypesInput
          value={selectedProductType} 
          onChange={(type) => setSelectedProductType(type)}
          mode="search"           
      />
      {position && draggedPosition && (
          <WebMap
              wantCursor
              markers={markers} // Passe les marqueurs mémorisés
              initalPosition={position}
              onPositionChange={(region) =>
                  setDraggedPosition({ lat: region.lat, lon: region.lon })
              }
          />
      )}
    </PageContainer>);
};

export default Home;
