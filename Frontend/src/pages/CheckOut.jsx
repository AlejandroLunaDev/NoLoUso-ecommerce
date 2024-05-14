import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { ItemCount } from "../components/Ui/ItemCount/ItemCount";
import { AiOutlineClose } from "react-icons/ai";
import { Cart } from "../components/icons/Cart";
import { Link } from "react-router-dom";
import { routes } from "@/routes/routes";
import { PurchaseButton } from "../components/Ui/Button/PurchaseButton";
import { getProductById } from "../service/db/productsMongo";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../helper/validateForm";

export const CheckOut = () => {
  const { cart, removeItem, clearCart, total } = useContext(CartContext);
  const subtotal = total.toFixed(2);
  const descuento = 0;
  const totalf = (subtotal - descuento).toFixed(2);
  const [productsData, setProductsData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Función asincrónica para obtener los datos de los productos por ID
    const fetchProductsData = async () => {
      const productsPromises = cart.map(async (item) => {
        const productData = await getProductById(item.itemId);
        return { ...productData, quantity: item.quantity };
      });
      const productsData = await Promise.all(productsPromises);
      setProductsData(productsData);
    };

    fetchProductsData();
  }, [cart]);



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
              {productsData.map((item) => (
                <tr key={item._id}>
                  <td className="items-center w-36 ">
                    <Link
                      to={`/product/${item._id}`}
                      className="flex justify-center mt-2 "
                    >
                      <img className="h-20" src={item.thumbnails} alt={item.title} />
                    </Link>
                  </td>
                  <td className="text-center w-74">
                    <span>{item.title}</span>
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
                  )}
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
                  )}
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
              <div /* onClick={isValid ? FinalizarPedido : undefined} */>
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
