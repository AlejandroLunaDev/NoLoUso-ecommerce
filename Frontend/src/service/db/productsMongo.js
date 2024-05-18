const BASE_URL = import.meta.env.VITE_BACK_PORT || 'https://nolouso-ecommerce-production.up.railway.app' ;
console.log('el puerto obtenido es:', BASE_URL)
export const getAllProducts = async (sortOrder = 'desc') => {
  try {
    const response = await fetch(`${BASE_URL}/api/products?sort=${sortOrder}`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};



export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto por ID');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    throw error;
  }
};

export const createProduct = async (newProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};
