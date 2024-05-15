import React, { useState, useContext } from "react";
import { CartContext } from "@/cart/context/CartContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Add, Remove } from "@/common/components";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { AuthContext } from "@/auth/context/AuthProvider";

const ButtonCount = ({ onAdd, stock, initial = 1 }) => {
  const [count, setCount] = useState(initial);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const mostrarAlerta = () => {
    Toastify({
      text: "Producto Agregado al Carrito",
      position: "right",
      gravity: "bottom",
      duration: 1500,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  const increment = () => {
    if (count < stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };

  const handleAddToCart = () => {
    onAdd(count);
    mostrarAlerta();
  };

  return (
    <div className="flex justify-between">
      <button
        className="border rounded-sm flex items-center justify-center"
        onClick={decrement}
      >
        <Remove />
      </button>
      <p className="text-[13px] border rounded-sm px-3 flex items-center">
        {count}
      </p>
      <button
        className="border rounded-sm flex items-center justify-center"
        onClick={increment}
      >
        <Add />
      </button>
      {user ? (
        <button
          className="bg-[#61005D] rounded text-center text-white py-1 px-2"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      ) : (
        <button
          className="bg-[#61005D] rounded text-center text-white py-1 px-2"
          onClick={() => navigate("/login")}
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
};

export function ItemDetail({
  title,
  category,
  thumbnails,
  price,
  stock,
  description,
}) {
  const ItemCount = ButtonCount;
  const { addItem, isInCart, cart } = useContext(CartContext);
  const [hasStock, setHasStock] = useState(stock > 0);
  const { itemId } = useParams();
  const navigate = useNavigate();

  const handleOnAdd = (quantity) => {
    const objProductToAdd = {
      itemId,
      title,
      price,
      quantity,
      thumbnails,
      stock,
    };
    addItem(objProductToAdd);
  };

  return (
    <section className="flex-none md:flex gap-4">
      <article className="">
        <header className="p-10">
          <img
            className="h-44 md:h-[400px]"
            src={thumbnails}
            alt={title}
          />
        </header>
      </article>
      <aside className="md:border-l pl-8">
        <article>
          <header className="mb-10">
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <div className="flex font-semibold text-sm gap-2">
              <p className="border-r border-black pr-3">SKU</p>
              <p>{itemId}</p>
            </div>
          </header>
          <p className="font-bold mb-5">$ {price}</p>
          <h3 className="font-bold">Categoria</h3>
          <p>{category}</p>
          <h3 className="font-bold">Descripción</h3>
          <p className="text-[11px] md:text-sm">{description}</p>
        </article>
        <div className="w-60 mt-8">
          {hasStock ? (
            !isInCart(itemId) ? (
              <ItemCount onAdd={handleOnAdd} stock={stock} />
            ) : (
              <div className="bg-[#61005D] rounded text-center text-white py-1">
                 <Link to="/cart">Seguir Comprando</Link>
              </div>
            )
          ) : (
            <div className="bg-red-500 text-white rounded px-2 py-1">
              No hay stock de este producto
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
