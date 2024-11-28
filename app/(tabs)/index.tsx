import { useEffect, useMemo, useState } from "react";
import Map from "@/components/Map";
import WebMap from "@/components/WebMap";
import PageContainer from "@/components/PageContainer";
import { Position } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import { useDataContext } from "@/contexts/DataContext";

const Home = (): JSX.Element => {
  const { position, error } = useUserLocation();
  const { pickedProducts } = useDataContext();

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
