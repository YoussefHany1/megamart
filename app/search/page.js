"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import categories from "../../stores/data.json";
import ProductCard from "../../components/product/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // get the search query from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        // Fetch all URLs from data.json
        const categoryPromises = Object.entries(categories).map(
          async ([catKey, url]) => {
            try {
              const res = await axios.get(url);
              const items = res.data.products || res.data || [];
              // Add category name to each product for use in the link
              return items.map((item) => ({ ...item, category: catKey }));
            } catch (err) {
              console.error(`Error fetching ${catKey}`, err);
              return [];
            }
          },
        );

        const results = await Promise.all(categoryPromises);
        // Merge all arrays into one array
        const allProducts = results.flat();
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products based on the search query
  const filteredProducts = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name && product.name.toLowerCase().includes(lowerQuery),
    );
  }, [products, query]);

  return (
    <main className="min-h-screen py-10 px-[5%]">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Search Results for: <span className="text-primary">"{query}"</span>
      </h1>

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredProducts.map((product, index) => (
            <span key={product.id} className="m-5">
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                category={product.category}
              />
            </span>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No products found matching your search.
        </p>
      )}
    </main>
  );
}
