import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function useFetchProducts(apiUrl, category) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    // Don't fetch if URL is not provided
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(apiUrl);
      const products = response.data.products || response.data || [];

      setItems(products);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch products";
      setError(errorMessage);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Refetch products manually
  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    items,
    loading,
    error,
    refetch,
  };
}

export default useFetchProducts;
