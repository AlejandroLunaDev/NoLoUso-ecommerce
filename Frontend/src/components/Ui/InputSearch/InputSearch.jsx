import { useTypewriter } from "react-simple-typewriter";
import categoriasData from "./categorias.json";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

export function InputSearch() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedQuery = searchValue.trim();
      if (trimmedQuery) {
        navigate(`/search/${trimmedQuery}`);
      } else {
        navigate("/");
      }
    }
  };

  const categorias = categoriasData.categorias.map(
    (categoria) => categoria.name
  );

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [text] = useTypewriter({
    words: categorias,
    loop: {},
    typeSpeed: 120,
  });

  return (
    <form className="relative">
      <input
        type="text"
        placeholder={`Buscar "${text}"`}
        value={searchValue}
        className="border border-gray-500 focus:outline-[#61005D] px-4 py-1  w-44 md:w-80  rounded-md"
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      <IoIosSearch className="searchIcon absolute right-2 top-0 translate-y-2/4" />
    </form>
  );
}
