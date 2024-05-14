import React, { useState } from "react";
import { ItemTable } from "../components/ItemTable";
import { FormAdmin } from "../components/FormAdmin";
import UsersList from "../components/UserList"; 

export const Admin = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("list");

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="flex">
        {/* Botones de pestañas */}
        <button
          className={`px-4 py-2  ${
            activeTab === "form" ? "bg-[#61005D] text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabClick("form")}
        >
          Agregar Producto
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "list" ? "bg-[#61005D] text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabClick("list")}
        >
          Lista de Productos
        </button>
        {/* Nueva pestaña para el listado de usuarios */}
        <button
          className={`px-4 py-2 ${
            activeTab === "users" ? "bg-[#61005D] text-white" : "bg-gray-300"
          }`}
          onClick={() => handleTabClick("users")}
        >
          Lista de Usuarios
        </button>
      </div>
      {activeTab === "form" && <FormAdmin onAddProduct={handleAddProduct} />}
      {activeTab === "list" && (
        <ItemTable products={products} setProducts={setProducts} />
      )}
      {activeTab === "users" && <UsersList />}
    </div>
  );
};
