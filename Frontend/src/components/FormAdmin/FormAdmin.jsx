import React, { useState } from "react";
import { createProduct } from "@/service/db/productsMongo";

export const FormAdmin = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    code: "",
    price: "",
    status: true,
    stock: "",
    category: "",
    thumbnails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await createProduct(newProduct);
      onAddProduct(createdProduct); // Llama a la función de manejo de la adición de productos
      setNewProduct({
        title: "",
        description: "",
        code: "",
        price: "",
        status: true,
        stock: "",
        category: "",
        thumbnails: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newProduct.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newProduct.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            value={newProduct.code}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={newProduct.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="text"
            name="stock"
            id="stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={newProduct.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnails" className="block text-sm font-medium text-gray-700">
            Thumbnails
          </label>
          <input
            type="text"
            name="thumbnails"
            id="thumbnails"
            value={newProduct.thumbnails}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="bg-[#61005D] text-white px-4 py-2 rounded-md mt-4">
          Add Product
        </button>
      </form>
    </div>
  );
};
