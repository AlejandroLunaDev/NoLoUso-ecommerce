import { useTypewriter } from "react-simple-typewriter";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "@/service/db/productsMongo";

export function InputSearch() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProductsData(allProducts);
        setIsLoading(false);
        const uniqueCategories = [
          ...new Set(allProducts.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [text] = useTypewriter({
    words: categories,
    loop: {},
    typeSpeed: 120,
    delaySpeed: 1500,
    onFinishedTyping: () => {
      setCurrentCategoryIndex(
        (prevIndex) => (prevIndex + 1) % categories.length
      );
    },
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
