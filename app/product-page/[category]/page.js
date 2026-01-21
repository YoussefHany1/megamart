"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import ProductCard from "../../../components/product/ProductCard";
import useFetchProducts from "../../../hooks/useFetchProducts";
import categories from "../../../stores/data.json";

const PRODUCTS_PER_PAGE = 25;

// مكون Pagination الصغير (تم نقله هنا)
const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="pagination flex justify-center mb-5">
      <button
        className="px-4 py-2 border rounded-md text-(--primary) border-(--primary) hover:bg-(--primary) hover:text-white transition mr-2"
        onClick={onPrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="self-center px-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 border rounded-md text-(--primary) border-(--primary) hover:bg-(--primary) hover:text-white transition ml-2"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

// مكون الصفحة الرئيسي
function CategoryPage() {
  // 1. الحصول على اسم القسم من الرابط
  const params = useParams();
  const category = params.category;

  // 2. تحديد رابط الـ API بناءً على القسم
  const apiUrl = categories[category] || null;

  // 3. جلب البيانات
  const { items: products, error } = useFetchProducts(apiUrl, category);
  const [currentPage, setCurrentPage] = useState(1);

  // 4. فلترة المنتجات الصالحة
  const validProducts = useMemo(
    () => products.filter((product) => product.name && product.pic),
    [products],
  );

  // 5. حسابات التقسيم للصفحات (Pagination Logic)
  const totalPages = Math.ceil(validProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return validProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [validProducts, currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // معالجة الأخطاء والتحميل
  if (error) {
    return (
      <p className="text-red-600 text-4xl font-bold text-center mt-10">
        There was an error. Please try again later.
      </p>
    );
  }

  return (
    <main>
      <h2 className="text-center my-12 uppercase text-4xl text-(--primary) font-bold">
        {category}
      </h2>

      {/* حالة عدم وجود منتجات */}
      {!error && validProducts.length === 0 && (
        <p className="text-center text-xl mt-5">
          Loading or No products available...
        </p>
      )}

      {/* عرض قائمة المنتجات */}
      <div className="products flex flex-wrap items-center justify-center mt-5 pb-5">
        {currentProducts.map((product) => (
          <span key={product.id} className="m-5">
            <ProductCard product={product} category={category} />
          </span>
        ))}
      </div>

      {/* عرض أزرار التنقل إذا كان هناك أكثر من صفحة */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </main>
  );
}

export default CategoryPage;
