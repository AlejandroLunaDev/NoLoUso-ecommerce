import React, { useContext } from "react";
import { Add, Remove } from "@/common/components";
import { CartContext } from "@/cart/context/CartContext";

export function ItemCount({ productId, stock, initial }) {
  const { addQuantity, removeQuantity, setTotalQuantity, removeItem } = useContext(CartContext);

  const increment = () => {
    if (initial < stock) {
      addQuantity(productId, 1);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    }
  };

  const decrement = () => {
    if (initial > 1) {
      removeQuantity(productId, 1);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
    } else if (initial === 1) {
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
          {initial}
        </div>
        <button className="border rounded-sm" onClick={increment}>
          <Add />
        </button>
      </article>
    </section>
  );
}
