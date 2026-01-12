"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import categories from "../../stores/data.json";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // الحصول على كلمة البحث من الرابط
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        // جلب جميع الروابط من ملف data.json
        const categoryPromises = Object.entries(categories).map(
          async ([catKey, url]) => {
            try {
              const res = await axios.get(url);
              const items = res.data.products || res.data || [];
              // إضافة اسم التصنيف لكل منتج لنتمكن من استخدامه في الرابط
              return items.map((item) => ({ ...item, category: catKey }));
            } catch (err) {
              console.error(`Error fetching ${catKey}`, err);
              return [];
            }
          }
        );

        const results = await Promise.all(categoryPromises);
        // دمج كل المصفوفات في مصفوفة واحدة
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

  // تصفية المنتجات بناءً على كلمة البحث
  const filteredProducts = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name && product.name.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

  return (
    <main className="min-h-screen py-10 px-[5%]">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Search Results for: <span className="text-(--primary)">"{query}"</span>
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
