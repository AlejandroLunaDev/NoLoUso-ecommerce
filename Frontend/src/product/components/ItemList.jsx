import { Item } from "./Item";

export function ItemList({ products }) {
  return (
    <section className="card-container gap-2">
      {products?.map((product) => {
        return <Item key={product._id} {...product} />;
      })}
    </section>
  );
}