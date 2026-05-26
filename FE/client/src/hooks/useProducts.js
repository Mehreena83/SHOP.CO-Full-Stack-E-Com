import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";

export default function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts(filters);

        setProducts(response.data.results);
        setCount(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    count,
  };
}
