import { Item } from "./Item";

export function ItemList({ products }) {
  return (
    <section className="card-container gap-2">
      {products.map((product) => (
        <Item key={product._id} {...product} />
      ))}
    </section>
  );
}
