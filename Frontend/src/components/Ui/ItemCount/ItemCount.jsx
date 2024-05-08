import React, { useContext } from "react";
import { Add, Remove } from "@/components";
import { CartContext } from "@/context/CartContext";

export function ItemCount({ productId, stock }) {
  const { cart, addQuantity, removeQuantity, setTotalQuantity, removeItem } =
    useContext(CartContext);

  const productInCart = cart.find((item) => item.id === productId);
  const productQuantityInCart = productInCart ? productInCart.quantity : 0;

  const increment = () => {
    if (productQuantityInCart < stock) {
      if (productInCart) {
        addQuantity(productId, 1);
      } else {
        addQuantity({ id: productId, quantity: 1 });
      }
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    }
  };

  const decrement = () => {
    if (productQuantityInCart > 1) {
      removeQuantity(productId);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
    } else if (productQuantityInCart === 1) {
      removeItem(productId);
    }
  };

  return (
    <section>
      <article className="flex items-center gap-1">
        <button className="border rounded-sm" onClick={decrement}>
          <Remove />
        </button>
        <div className="text-[13px] border rounded-sm px-3">
          {productQuantityInCart}
        </div>
        <button className="border rounded-sm" onClick={increment}>
          <Add />
        </button>
      </article>
    </section>
  );
}
