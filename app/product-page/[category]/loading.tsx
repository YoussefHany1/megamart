import ProductCardSkeleton from "@/features/product/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <main>
      <div className="my-12 h-12 w-48 mx-auto bg-gray-200 animate-pulse rounded" />
      <div className="flex flex-wrap items-center justify-center mt-5 pb-5">
        {Array.from(new Array(12)).map((_, index) => (
          <div key={index} className="flex justify-center m-5">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </main>
  );
}
