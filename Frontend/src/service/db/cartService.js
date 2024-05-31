const isProduction = import.meta.env.MODE === 'production';
const BASE_URL = isProduction ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV;


const cartsService = {
  // Función para crear un nuevo carrito para el usuario autenticado
  createCart: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el refreshToken en el localStorage');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/carts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al crear el carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      throw error;
    }
  },

  // Función para obtener el carrito del usuario autenticado
  getCart: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No se encontró el refreshToken en el localStorage');
      throw new Error('No se encontró el refreshToken en el localStorage');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/carts`, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      console.log('API Response:', response); // Log de la respuesta completa
      if (!response.ok) {
        console.error('Error al obtener el carrito:', response.statusText);
        return undefined;
      }
      const data = await response.json();
      console.log('Cart Data:', data); // Log de los datos del carrito
      return data;
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      throw error;
    }
  },
  // Función para agregar un producto al carrito del usuario autenticado
  addProductToCart: async (productId, quantity) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el refreshToken en el localStorage');
    }
  
    try {
      // Asegurarse de que el carrito exista antes de agregar el producto
      await cartsService.getCart().catch(async () => {
        await cartsService.createCart();
      });
  
      console.log('Adding product to cart:', { productId, quantity }); // Añadir log para debug
  
      const response = await fetch(`${BASE_URL}/api/carts/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar el producto al carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      throw error;
    }
  },
  

  // Función para actualizar la cantidad de un producto en el carrito del usuario autenticado
  updateProductQuantity: async (productId, quantity) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el refreshToken en el localStorage');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/carts/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la cantidad del producto en el carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto en el carrito:', error);
      throw error;
    }
  },

  // Función para eliminar un producto del carrito del usuario autenticado
  removeProductFromCart: async (productId) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el refreshToken en el localStorage');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/carts/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto del carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
      throw error;
    }
  },

  // Función para vaciar el carrito del usuario autenticado
  clearCart: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el refreshToken en el localStorage');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/carts`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al vaciar el carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
      throw error;
    }
  },

  // Función para actualizar el carrito del usuario autenticado con una lista de productos
  updateCart: async (products) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el refreshToken en el localStorage');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/carts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ products }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      throw error;
    }
  },
};

export default cartsService;
