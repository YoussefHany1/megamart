import ProductList from "../../components/ProductList/ProductList";
function Wearables() {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/e32941d88b96cc9fba113566611a7499/raw/66f314f4bad8771f986f64d2e115ca290f34f074/wearables.json";
    return (
    <>
    <main>
      <h1 className="text-center mt-5">Wearables</h1>
      <ProductList apiUrl={apiUrl} productsPerPage={20} />
    </main>
        </>
    );
}

export default Wearables;
