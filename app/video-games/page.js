import ProductList from "../../components/ProductList/ProductList";
function VideoGames() {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/e8f379d8cb4e29d1800c28a986dc242a/raw/c7ecbb736d3819ebf734c6a66e169a9700a837be/video-games.json";
    const category = "video-games";
    return (
    <>
    <main>
      <h1 className="text-center mt-5">Video Games</h1>
      <ProductList apiUrl={apiUrl} category={category} productsPerPage={20} />
    </main>
    </>
    );
}

export default VideoGames;
