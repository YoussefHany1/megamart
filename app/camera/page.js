import ProductList from "../../components/ProductList/ProductList";
function Phones() {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/d6c18d5196d090432448ecc82c80509f/raw/6c524309284e9d36d849565a2769e5f783be7509/camera.json";
    const category = "camera";
    return (
    <>
    <main>
      <h1 className="text-center mt-5 fw-bold text-primary">Camera</h1>
      <ProductList apiUrl={apiUrl} category={category} productsPerPage={20} />
    </main>
    </>
    );
}

export default Phones;
