import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/service/db/productsMongo";
import { Button, Modal, Box, TextField } from "@mui/material";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const ItemTable = ({ products, setProducts }) => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]);

  const fetchProducts = async () => {
    try {
      const allProducts = await getAllProducts(sortOrder);
      setProducts(allProducts.payload); // Suponiendo que la respuesta tiene una propiedad payload con los productos
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const mostrarAlerta = (message, color) => {
    Toastify({
      text: message,
      gravity: "bottom",
      duration: 2000,
      style: {
        background: color,
      },
    }).showToast();
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
      mostrarAlerta("Producto Eliminado", "red");
    } catch (error) {
      console.error("Error deleting product:", error);
      mostrarAlerta("Error al eliminar el producto", "red");
    }
  };

  const handleOpenModal = async (productId) => {
    try {
      const product = await getProductById(productId);
      setSelectedProduct(product);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModal(false);
  };

  const handleEditProduct = async () => {
    try {
      await updateProduct(selectedProduct._id, selectedProduct);
      fetchProducts(); // Recargar productos después de la edición
      handleCloseModal();
      mostrarAlerta("Producto Actualizado", "#61005D");
    } catch (error) {
      console.error("Error updating product:", error);
      mostrarAlerta("Error al actualizar el producto", "red");
    }
  };

  const handleChangeSortOrder = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
  };

  return (
    <div className="container mx-auto mt-8">
      <label htmlFor="sortSelect" className="mr-2">
        Ordenado por:
      </label>
      <select
        id="sortSelect"
        value={sortOrder}
        onChange={handleChangeSortOrder}
        className="mb-4 border p-1 rounded-xl"
      >
        <option value="desc">Cargado recientemente</option>
        <option value="asc">Cargado más antiguo</option>
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
              <td className="border border-gray-300 px-4 py-2">
                {product._id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.title}
              </td>
              <td className="border border-gray-300 px-4 py-2 font-semibold text-[#61005D]">
                {product.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.stock}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.category}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-[#61005D] font-semibold">
                {new Date(product.created_at).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <img
                  className="w-12 h-12"
                  src={product.thumbnails}
                  alt={product.title}
                />
              </td>
              <td className="border border-gray-300 text-center">
                <button
                  onClick={() => handleOpenModal(product._id)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-md"
                >
                  Edit
                </button>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <Box className="flex flex-col gap-4 rounded-xl h-auto w-96 bg-white p-4">
          <TextField
            label="Title"
            value={selectedProduct ? selectedProduct.title : ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, title: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={selectedProduct ? selectedProduct.description : ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                description: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={selectedProduct ? selectedProduct.price : ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, price: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Thumbnails"
            value={selectedProduct ? selectedProduct.thumbnails : ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                thumbnails: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Code"
            value={selectedProduct ? selectedProduct.code : ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, code: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock"
            type="number"
            value={selectedProduct ? selectedProduct.stock : ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, stock: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={selectedProduct ? selectedProduct.category : ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                category: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <Button onClick={handleEditProduct} sx={{ color: "#61005D" }}>
            Guardar cambios
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
