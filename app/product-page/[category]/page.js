import ProductList from "../../../components/ProductList/ProductList";
import categories from "../../../stores/data.json";

async function CategoryPage({ params }) {
  const { category } = params;
  const apiUrl = categories[category] || null;
  return (
    <>
      <main>
        <h1 className="text-center mt-5">{category}</h1>
        <ProductList apiUrl={apiUrl} category={category} productsPerPage={20} />
      </main>
    </>
  );
}

export default CategoryPage;
