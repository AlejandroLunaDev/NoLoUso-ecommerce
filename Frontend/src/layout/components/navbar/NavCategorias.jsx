import React, { useState, useEffect, useContext } from 'react';
import { Hambuerguer } from '@/common/components/icons/Hambuerguer';
import { useParams, useNavigate } from 'react-router-dom';
import { useAsync } from "@/common/hook/useAsync";
import { getAllProducts } from "@/service/db/productsMongo";
import { CategoryContext } from '@/product/context/categoryProvider';

export function NavCategorias() {
  const { setSelectedCategory } = useContext(CategoryContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const { categoryId } = useParams();
  const navigate = useNavigate();
  const asyncFunction = () => getAllProducts("desc", 1, 100);  // Fetch more products to ensure we get all categories
  const { data: products, loading, error } = useAsync(asyncFunction, [categoryId]);

  useEffect(() => {
    if (products && products.payload && products.payload.length > 0) {
      const categoriesSet = new Set(products.payload.map(product => product.category));
      setUniqueCategories(Array.from(categoriesSet));
    }
  }, [products]);

  if (loading) {
    return <h1>Se están cargando los productos...</h1>;
  }

  if (error) {
    return <h1>Hubo un error al cargar los productos</h1>;
  }

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleCategoryClickInternal = (category) => {
    console.log('Selected category:', category); // Añadir log para verificar la categoría seleccionada
    setSelectedCategory(category);
    navigate(`/categoria/${category.toLowerCase()}`);
  };

  return (
    <section className='hidden md:block'>
      <button onMouseEnter={handleMouseEnter}>
        <Hambuerguer />
      </button>
      {isMenuOpen && (
        <article
          className="bg-white w-36 rounded-lg shadow shadow-[#61005D] absolute p-2"
          onMouseLeave={handleMouseLeave}
        >
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClickInternal(category)}
            >
              <p className="hover:border-b border-[#61005D]">{category}</p>
            </button>
          ))}
        </article>
      )}
    </section>
  );
}
