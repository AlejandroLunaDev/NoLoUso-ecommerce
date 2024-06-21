import React, { useContext } from 'react';
import { CartContext } from '@/cart/context/CartContext';
import { ItemCount } from '@/common/components/ItemCount';
import { CheckOutButton } from './CheckOutButton';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { Cart } from '../../common/components/icons/Cart';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Swal from 'sweetalert2';

export const SidebarCart = ({ isOpen, setOpen }) => {
  const { cart, clearCart, removeItem, addItem, subtotal, total } = useContext(CartContext);
  const navigate = useNavigate();
  const descuento = 0;



  const alertaDeleteCarrito = () => {
    Swal.fire({
      title: '¿Estás seguro de eliminar tu carrito?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'alert-popup-class'
      },
      position: 'center'
    }).then(result => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire({
          title: '¡Eliminado!',
          text: 'Tu carrito ha sido borrado',
          icon: 'success'
        });
      }
    });
  };

  const mostrarAlerta = () => {
    Toastify({
      text: 'Producto eliminado',
      gravity: 'bottom',
      duration: 2000,
      style: {
        background: 'red'
      }
    }).showToast();
  };

  const handleRemoveItem = itemId => {
    removeItem(itemId);
    mostrarAlerta();
  };

  const handleCheckout = () => {
    navigate('/CheckOut');
    setOpen(false);
  };
  const handleAddItem = (productId, quantity) => {
    const productToAdd = {
      itemId: productId,
      quantity: quantity
    };
    addItem(productToAdd);
  };

  return (
    <section className='w-96 p-2 h-full carrito z-0'>
      <header className='border-b flex justify-between px-4 '>
        <h3 className='font-bold'>Mi Carrito</h3>
        <button className='text-xl ' onClick={() => setOpen(false)}>
          <AiOutlineClose />
        </button>
      </header>
      {cart.length > 0 ? (
        <div className='mt-4'>
          <ul className='overflow-y-auto max-h-[450px] mb-5'>
            {cart.map((item, index) => (
              <li className='flex gap-6' key={index}>
                <div className='flex gap-1'>
                  <button
                    className='border border-black rounded-full mt-4 p-1 h-6 w-6 flex items-center justify-center'
                    onClick={() => handleRemoveItem(item.product._id)} // Accede al ID del producto dentro del objeto 'product'
                  >
                    <AiOutlineClose />
                  </button>
                  <Link
                    to={`/product/${item.product._id}`} // Accede al ID del producto dentro del objeto 'product'
                    onClick={() => setOpen(false)}
                    className='w-36'
                  >
                    <img
                      className='h-28'
                      src={item.product.thumbnails}
                      alt={item.product.title}
                    />{' '}
                  </Link>
                </div>
                <div>
                  <div>
                    <span>{item.product.title}</span>
                    <p className='mb-3'>${item.product.price}</p> 
                    <ItemCount
                      productId={item.product._id} // Accede al ID del producto dentro del objeto 'product'
                      stock={item.product.stock} // Por ejemplo, si el objeto 'product' también contiene información sobre el stock
                      initial={item.quantity}
                      onAdd={handleAddItem}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex justify-between'>
            <p>Subtotal</p>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <p>Descuentos</p>
            <span>-${descuento}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-bold'>Total</p>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className='px-2'>
            <CheckOutButton text={'Comprar Ahora'} onClick={handleCheckout} />
          </div>
          <div className='px-2 mt-7'>
            <button
              className='w-full flex justify-center'
              onClick={alertaDeleteCarrito}
            >
              <BsTrash className='w-8 h-8' />
            </button>
          </div>
        </div>
      ) : (
        <section className='flex justify-center items-center flex-col h-full'>
          <Cart />
          <p className='text-center my-4'>Tu carrito está vacío.</p>
        </section>
      )}
    </section>
  );
};
