import ProductList from "../../components/ProductList/ProductList";
function Televisions() {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/de3895f0d4ba03861c3f4e51a5dd7c75/raw/9e3e726170c236bf9dcc7bf5f73bb2e5d4f1a9e2/tv.json";
    const category = "televisions";
    return (
    <>
    <main>
      <h1 className="text-center mt-5">Televisions</h1>
      <ProductList apiUrl={apiUrl} category={category} productsPerPage={20} />
    </main>
    </>
    );
}

export default Televisions;
