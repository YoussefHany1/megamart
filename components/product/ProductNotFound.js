const ProductNotFound = () => (
  <div className="container my-5 text-center">
    <div
      className="bg-red-100 text-red-700 border border-red-300 rounded p-4"
      role="alert"
    >
      <h2 className="text-2xl font-bold">Product Not Found</h2>
      <p className="mb-0">
        The product you're looking for doesn't exist or has been removed.
      </p>
    </div>
  </div>
);

export default ProductNotFound;
