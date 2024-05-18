import { ItemDetail } from "./ItemDetail";
import { useParams } from "react-router";
import { useAsync } from "@/common/hook/useAsync";
import { getProductById } from "@/service/db/productsMongo"; 

export function ItemDetailContainer() {
  const { itemId } = useParams();
  const asyncFunction = () => getProductById(itemId); // Usa la función para obtener el producto por ID desde MongoDB
  const { data: product, loading, error } = useAsync(asyncFunction, [itemId]);

  if (loading) {
    return <h1>Se está cargando el producto...</h1>;
  }

  if (error || !product) { // Verificar si hay un error o si los datos del producto no están definidos
    return <h1>Hubo un error obteniendo el producto.</h1>;
  }

  return (
    <section className="h-dvh flex items-center justify-center">
      <ItemDetail {...product} />
    </section>
  );
}
