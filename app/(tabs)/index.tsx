import { useEffect, useMemo, useState } from "react";
import WebMap, {MarkerType} from "@/components/WebMap";
import PageContainer from "@/components/PageContainer";
import { PickedProduct, Position, ProductType } from "@/constants/Types";
import useUserLocation from "@/hooks/useUserLocation";
import { useDataContext } from "@/contexts/DataContext";
import ProductTypesInput from "@/components/ProductTypesInput";
import ProductModal from "@/components/ProductModal";

const Home = (): JSX.Element => {
  const { position, error } = useUserLocation();
  const { pickedProducts } = useDataContext();

  const [selectedProductType, setSelectedProductType] = useState<ProductType | "">("");
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [productToDisplay, setProductToDisplay] = useState<PickedProduct | null>(null);

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
      id: product.id,
    }));
  }, [pickedProducts, selectedProductType]);

  const [draggedPosition, setDraggedPosition] = useState<Position | null>(null);

  useEffect(() => {
      if (position && !draggedPosition) setDraggedPosition(position);
  }, [position]);

  const handleOpenModal = (marker: MarkerType) => {
    setProductToDisplay(pickedProducts.find((product) => product.id === marker.id) as PickedProduct);
    setIsProductModalVisible(true);
  }

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
              onMarkerClick={(marker: MarkerType) => {
                  handleOpenModal(marker);
              }}
          />
      )}
      {productToDisplay && <ProductModal
          product={productToDisplay}
          isVisible={isProductModalVisible}
          setIsVisible={setIsProductModalVisible}
      />}
    </PageContainer>);
};

export default Home;
