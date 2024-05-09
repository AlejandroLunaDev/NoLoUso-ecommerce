import React, { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "@/service/db/productsMongo";

export const ItemTable = ({ products, setProducts }) => {
  const [sortOrder, setSortOrder] = useState('desc'); // Estado para almacenar el orden actual

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]); // Vuelve a cargar los productos cuando cambia el orden

  const fetchProducts = async () => {
    try {
      const allProducts = await getAllProducts(sortOrder);
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => String(product._id) !== String(productId)));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleChangeSortOrder = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder); // Cambia el orden al seleccionar una opción del select
  };

  const sortOrderText = sortOrder === 'desc' ? 'más antiguo' : 'más nuevo'; // Texto para mostrar el criterio de ordenamiento

  return (
    <div className="container mx-auto mt-8">
      <label htmlFor="sortSelect" className="mr-2">Ordenado por:</label>
      <select id="sortSelect" value={sortOrder} onChange={handleChangeSortOrder} className="mb-4 border p-1 rounded-xl">
        <option value="desc">más antiguo a más nuevo</option>
        <option value="asc">más nuevo a más antiguo</option>
      </select>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">{product._id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.title}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
              <td className="border border-gray-300 px-4 py-2">{product.category}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(product.created_at).toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <img className="w-12 h-12" src={product.thumbnails} alt={product.title} />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
