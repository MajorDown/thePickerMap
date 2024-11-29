import { useEffect, useMemo, useState } from "react";
import WebMap from "@/components/WebMap";
import PageContainer from "@/components/PageContainer";
import { Position, ProductType, ProductTypes } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import { useDataContext } from "@/contexts/DataContext";
import ProductTypesInput from "@/components/ProductTypesInput";

const Home = (): JSX.Element => {
  const { position, error } = useUserLocation();
  const { pickedProducts } = useDataContext();

  const [selectedProductType, setSelectedProductType] = useState<ProductType | "">("");

  // Utiliser useMemo pour mémoriser les marqueurs
  const markers = useMemo(() => {
      return pickedProducts.map((product) => ({
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

  return (
      <PageContainer title="Vos Cuillettes">
          {error && <p>{error}</p>}
          <ProductTypesInput
              value={selectedProductType} 
              onChange={(type) => console.log(type)}
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
      </PageContainer>
  );
};

export default Home;
