import { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import { getAllProducts } from "@/service/db/productsMongo";
import { useParams, useLocation } from "react-router-dom";

export function ItemlistContainer({ greeting }) {
  const { categoryId } = useParams();
  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search/");
  let categoryToFetch = categoryId;

  if (isSearchPage) {
    categoryToFetch = location.pathname.split("/search/")[1];
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryToFetch]); // Solo vuelve a ejecutar la solicitud si cambia la categoría

  if (loading) {
    return <h1>Se están cargando los productos...</h1>;
  }

  if (error || !products || !products.length) {
    return <h1>Hubo un error al cargar los productos</h1>;
  }

  return (
    <div className="item-list-container">
      <h2 className="my-4 font-bold">Nuestros Productos</h2>
      <ItemList products={products} />
    </div>
  );
}
