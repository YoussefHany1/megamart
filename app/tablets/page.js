import ProductList from "../../components/ProductList/ProductList";
function Tablets() {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/8fa719a681a9ad0b15ae46ac2edec9da/raw/6f566a62320a85acfd1bfcd24c61167e178071f5/tablets.json";
    return (
    <>
    <main>
      <h1 className="text-center mt-5">Tablets</h1>
      <ProductList apiUrl={apiUrl} productsPerPage={20} />
    </main>
    </>
    );
}

export default Tablets;
