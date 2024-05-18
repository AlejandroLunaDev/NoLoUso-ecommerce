import { useEffect, useState } from 'react';
import { Hambuerguer } from '@/common/components/icons/Hambuerguer';
import { NavLink } from 'react-router-dom';
import { useAsync } from "@/common/hook/useAsync";
import { useParams } from "react-router-dom";
import { getAllProducts } from "@/service/db/productsMongo";

export function NavCategorias({ handleCategoryClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);
 
  const { categoryId } = useParams()
  const asyncFunction = () =>  getAllProducts(categoryId)
  const { data: products, loading, error } = useAsync(asyncFunction, [categoryId])

 /*  useEffect(() => {
    if (products && products.length > 0) {
      const categoriesSet = new Set(products.map(product => product.category));
      setUniqueCategories(Array.from(categoriesSet));
    }
  }, [products]); */

  if(loading) {
    return <h1>Se están cargando los productos...</h1>
  }

  if(error) {
    return <h1>Hubo un error al cargar los productos</h1>
  }

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
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
            <NavLink
              to={`/categoria/${category.toLowerCase()}`}
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              <p className="hover:border-b border-[#61005D]">{category}</p>
            </NavLink>
          ))}
        </article>
      )}
    </section>
  );
}
