import { useMemo } from "react";
import { PickedProduct, ProductType} from "@/constants/Types";
import pickDateToDate from "@/tools/pickDateToDate";
import getSeason from "@/tools/getSeason";

type HookProps = {
    products: PickedProduct[];
    selectedProductType: ProductType | "";
    selectedFilter: { value: string | number };
}

export const useFilteredProducts = (props: HookProps) => {
  return useMemo(() => {
    const today = new Date();

    return props.products.filter((product) => {
      // Filtrage par type
      if (props.selectedProductType && product.type !== props.selectedProductType) {
        return false;
      }

      // Filtrage par période ou saison
      const productDate = pickDateToDate(product.date);

      if (props.selectedFilter.value === "byPeriod") {
        const start = new Date(today);
        const end = new Date(today);

        start.setDate(today.getDate() - 20);
        end.setDate(today.getDate() + 20);

        return productDate >= start && productDate <= end;
      }

      if (props.selectedFilter.value === "bySeason") {
        return getSeason(productDate) === getSeason(today);
      }

      return true;
    });
  }, [props.products, props.selectedProductType, props.selectedFilter]);
};
