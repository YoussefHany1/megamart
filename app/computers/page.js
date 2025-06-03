import ProductList from "../../components/ProductList/ProductList";
function Computers() {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/7c9c34655b1826b779740c6793c3efef/raw/1d0809d41544f5eea1f1c5fa076a4a0bb1a84e1e/computers.json";
    const category = "computers";
    return (
    <>
    <main>
      <h1 className="text-center mt-5">Computers</h1>
      <ProductList apiUrl={apiUrl} category={category} productsPerPage={20} />
    </main>
    </>
    );
}

export default Computers;
