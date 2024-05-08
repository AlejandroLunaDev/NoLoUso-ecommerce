import { Link } from "react-router-dom";

export function Item({ _id, thumbnails, title, price, category }) {
  return (
    <article className="border border-[#61005D] rounded-md p-3">
      <header className="flex justify-center border-b border-b-[#61005D] ">
        <img className="mb-2 h-24" src={thumbnails} alt={title} />
      </header>
      <div className="text-center">
        <h3 className=" text-md">{title}</h3>
        <p className=" font-semibold">$ {price}</p>
        <Link
          to={`/product/${_id}`}
          className="hover:color-[#61005D] hover:font-semibold "
        >
          Ver detalle --&gt;
        </Link>
      </div>
    </article>
  );
}
