import { ItemList } from "../ItemList/ItemList";
import { useAsync } from "../../hook/useAsync";
import { memo } from "react";
import { getAllProducts } from "../../service/db/productsMongo"; // Importa la función para obtener todos los productos de MongoDB
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ItemListMemoized = memo(ItemList);

export function ItemlistContainer({ greeting }) {
  const { categoryId } = useParams();
  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search/");
  let categoryToFetch = categoryId;

  if (isSearchPage) {
    categoryToFetch = location.pathname.split("/search/")[1];
  }
  const asyncFunction = () => getAllProducts(); // Usa la función para obtener todos los productos de MongoDB
  const {
    data: products,
    loading,
    error,
  } = useAsync(asyncFunction, []); // No es necesario pasar ningún argumento en este caso

  if (loading) {
    return <h1>Se están cargando los productos...</h1>;
  }

  if (error) {
    return <h1>Hubo un error al cargar los productos</h1>;
  }

  return (
    <div className="item-list-container">
      <h2 className="my-4 font-bold">Nuestros Productos</h2>
      <ItemListMemoized products={products} />
    </div>
  );
}
