import ProductList from "../../components/ProductList/ProductList";
function Phones() {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/72b0b370f8e0bc13c7c043e26b0449f9ee3f08c0/phoneData.json";
    return (
    <>
    <main>
      <h1 className="text-center mt-5">Phones</h1>
      <ProductList apiUrl={apiUrl} productsPerPage={20} />
    </main>
    </>
    );
}

export default Phones;
