const isProduction = import.meta.env.MODE === 'production';
const BASE_URL = isProduction ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_DEV;
const SOCKET_URL = isProduction ? import.meta.env.VITE_SOCKET_URL_PROD : import.meta.env.VITE_SOCKET_URL_DEV;

export const getAllProducts = async (sortOrder = 'desc', page = 1, limit = 10, category = '', availability = '') => {
  try {
    const url = new URL(`${BASE_URL}/api/products`);
    const params = { sort: sortOrder, page, limit };
    if (category) params.category = category;
    if (availability) params.availability = availability;
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`);
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
