import React, { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "@/service/db/productsMongo";

export const ItemTable = ({ products, setProducts }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Estado para controlar el orden

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();

        const sortedByDate = allProducts.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
   
        const productsWithIncrementalId = sortedByDate.map((product, index) => ({
          ...product,
          incrementalId: index + 1,
        }));
        setProducts(productsWithIncrementalId);
        setSortedProducts(productsWithIncrementalId);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleDeleteProduct = async (incrementalId) => {
    try {
      const productId = sortedProducts.find(product => product.incrementalId === incrementalId)?._id;
      if (!productId) {
        throw new Error("Product ID not found");
      }
      await deleteProduct(productId);
      setSortedProducts(sortedProducts.filter(product => product.incrementalId !== incrementalId));
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedList = [...sortedProducts].sort((a, b) => {
      if (order === "asc") {
        return a.incrementalId - b.incrementalId;
      } else {
        return b.incrementalId - a.incrementalId;
      }
    });
    setSortedProducts(sortedList);
  };
  
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <div>
          <label>Ordenar por ID:</label>
          <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">{product.incrementalId}</td>
              <td className="border border-gray-300 px-4 py-2">{product.title}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
              <td className="border border-gray-300 px-4 py-2">{product.category}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <img className="w-12 h-12" src={product.thumbnails} alt={product.title} />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteProduct(product.incrementalId)} // Pasar el ID incremental
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
