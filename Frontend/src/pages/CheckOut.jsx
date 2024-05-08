import React, { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { ItemCount } from "../components/Ui/ItemCount/ItemCount";
import { AiOutlineClose } from "react-icons/ai";
import { Cart } from "../components/icons/Cart";
import { Link } from "react-router-dom";
import { routes } from "@/routes/routes";
import { PurchaseButton } from "../components/Ui/Button/PurchaseButton";
import { db } from "../service/firebase/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  documentId,
  writeBatch,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../helper/validateForm";

export const CheckOut = () => {
  const { cart, removeItem, clearCart, total } = useContext(CartContext);
  const subtotal = total.toFixed(2);
  const descuento = 0;
  const totalf = (subtotal - descuento).toFixed(2);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

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

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFocusedField(name);

    const { errors: fieldErrors } = validateForm({ [name]: value });
    setFormErrors({ ...formErrors, [name]: fieldErrors[name] });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    const { errors, isValid } = validateForm({ ...formData, [name]: value });
    setFormErrors(errors);
    setIsValid(isValid);
  };

  const handleRemoveItem = (item) => {
    removeItem(item.id);
  };

  const FinalizarPedido = async () => {
    const { errors, isValid } = validateForm(formData);
    setFormErrors(errors);
    setIsValid(isValid);

    if (isValid) {
      try {
        setLoading(true);
        const totalCompra = Number(total);
        const objOrder = {
          Cliente: formData,
          productos: cart.map((item) => ({ ...item, cantidad: item.quantity })),
          total: totalCompra,
          date: Timestamp.fromDate(new Date()),
        };

        const batch = writeBatch(db);
        const outOfStock = [];
        const ids = cart.map((prod) => prod.id);

        const productsCollection = query(
          collection(db, "products"),
          where(documentId(), "in", ids)
        );

        const querySnapshot = await getDocs(productsCollection);
        const { docs } = querySnapshot;

        docs.forEach((doc) => {
          const data = doc.data();
          const stockDb = data.stock;

          const productAddedToCart = cart.find((prod) => prod.id === doc.id);
          const prodQuantity = productAddedToCart.quantity;

          if (stockDb >= prodQuantity) {
            batch.update(doc.ref, { stock: stockDb - prodQuantity });
          } else {
            outOfStock.push({ id: doc.id, ...data });
          }
        });

        if (outOfStock.length === 0) {
          batch.commit();

          const orderCollection = collection(db, "orders");
          const { id } = await addDoc(orderCollection, objOrder);
          compraFinalizada();
          backHome();
          clearCart();
          setOrderId(id);
        } else {
          console.error("hay productos que no tienen stock disponible");
        }
      } catch (error) {
        console.error("Hubo un error en la generacion de la orden");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("El formulario no es válido");
    }
  };

  if (loading) {
    return <h1>Su orden esta siendo generada...</h1>;
  }

  if (orderId) {
    return <h1>El id de su orden es: {orderId}</h1>;
  }
  return (
    <section className="p-2 h-dvh w-full overflow-y-auto">
      <header className="flex gap-4 px-4  ">
        <Cart />
        <h3 className="font-bold text-xl">Mi Carrito</h3>
      </header>
      {cart.length > 0 ? (
        <div className="mt-4 gap-8 md:flex ">
          <table className="md:w-2/3 border border-[#61005D]  max-h-64">
            <thead className="border border-[#61005D] ">
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
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="items-center w-36 ">
                    <Link
                      to={`/product/${item.firestoreId}`}
                      className="flex justify-center mt-2 "
                    >
                      <img className="h-20" src={item.img} alt={item.name} />
                    </Link>
                  </td>
                  <td className="text-center w-74">
                    <span>{item.name}</span>
                  </td>
                  <td className="text-center">${item.price}</td>
                  <td>
                    <div className="flex justify-center">
                      <ItemCount productId={item.id} stock={item.stock} />
                    </div>
                  </td>
                  <td className="text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="border border-black rounded-full p-1 h-6 w-6 flex items-center justify-center"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <aside className=" md:flex-col gap-5 md:w-1/3 p-5">
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
            <article className="">
              {/* aca va el formulario */}
              <div className="mb-2">
                {!isValid && (
                  <p className="text-red-500 text-sm mb-2">
                    Se debe completar tus datos para finalizar la compra
                  </p>
                )}
                <form>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-gray-300 p-1 rounded-md mb-2 w-full"
                  />
                  {focusedField === "nombre" && formErrors.nombre && (
                    <p className="text-red-500 text-sm mb-2">
                      {formErrors.nombre}
                    </p>
                  )}{" "}
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-gray-300 rounded-md mb-2 p-1 w-full"
                  />
                  {focusedField === "email" && formErrors.email && (
                    <p className="text-red-500 text-sm mb-2">
                      {formErrors.email}
                    </p>
                  )}{" "}
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-gray-300 rounded-md mb-2 p-1 w-full"
                  />
                  {focusedField === "telefono" && formErrors.telefono && (
                    <p className="text-red-500 text-sm mb-2">
                      {formErrors.telefono}
                    </p>
                  )}
                </form>
              </div>
              <div  onClick={isValid ? FinalizarPedido : undefined}>
                <PurchaseButton
                  text={"Finalizar Compra"}
                  disabled={!isValid}
                  isValid={isValid}
                />
              </div>

              <div className="text-center mt-3">
                <Link to={routes.home}>
                  <span className="font-semibold underline ">
                    Seguir Comprando
                  </span>
                </Link>
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
