import React, { useContext } from "react";
import { CartContext } from "@/cart/context/CartContext";
import { ItemCount } from "@/common/components/ItemCount";
import { AiOutlineClose } from "react-icons/ai";
import { Cart } from "@/common/components/icons/Cart";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const CheckOut = () => {
  const { cart, removeItem, total } = useContext(CartContext);
  const subtotal = total.toFixed(2);
  const descuento = 0;
  const totalf = (subtotal - descuento).toFixed(2);

  const navigate = useNavigate();

  const compraFinalizada = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Compra Finalizada",
      showConfirmButton: false,
      timer: 2200,
    });
  };

  const backHome = () => {
    navigate("/");
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  return (
    <section className="p-2 h-dvh w-full overflow-y-auto">
      <header className="flex gap-4 px-4">
        <Cart />
        <h3 className="font-bold text-xl">Mi Carrito</h3>
      </header>
      {cart.length > 0 ? (
        <div className="mt-4 gap-8 md:flex">
          <table className="md:w-2/3 border border-[#61005D] max-h-64">
            <thead className="border border-[#61005D]">
              <tr>
                <th></th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product._id}>
                  <td className="items-center w-36">
                    <Link
                      to={`/product/${item.product._id}`}
                      className="flex justify-center mt-2"
                    >
                      <img className="h-20" src={item.product.thumbnails} alt={item.product.title} />
                    </Link>
                  </td>
                  <td className="text-center w-74">
                    <span>{item.product.title}</span>
                  </td>
                  <td className="text-center">${item.product.price}</td>
                  <td>
                    <div className="flex justify-center">
                      <ItemCount productId={item.product._id} stock={item.product.stock} initial={item.quantity} />
                    </div>
                  </td>
                  <td className="text-center">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="border border-black rounded-full p-1 h-6 w-6 flex items-center justify-center"
                      onClick={() => handleRemoveItem(item.product._id)}
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <aside className="md:flex-col gap-5 md:w-1/3 p-5">
            <article>
              <h1 className="text-sm md:text-xl">Resumen de compra</h1>
              <div className="flex justify-between">
                <p className="text-sm md:text-md">Subtotal</p>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm md:text-md">Descuentos</p>
                <span>-${descuento}</span>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Total</p>
                <span>${totalf}</span>
              </div>
            </article>
          </aside>
        </div>
      ) : (
        <section className="flex justify-center items-center flex-col h-full">
          <Cart />
          <p className="text-center my-4">Tu carrito se encuentra vacío.</p>
        </section>
      )}
    </section>
  );
};
