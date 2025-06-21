import axios from "axios";
import { useEffect, useState } from "react";

function UseFetchProducts(apiUrl, category) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const res = await axios.get(apiUrl);
                const products = res.data.products;
                setItems(products);
            } catch (error) {
                setError(error.message);
                console.error(error);
            }
        };
        fetchPhones();
    }, [apiUrl, category]);
    return ({ items, error });
}
export default UseFetchProducts