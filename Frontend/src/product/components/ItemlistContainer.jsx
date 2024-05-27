import React, { useState, useEffect, useContext } from 'react';
import { ItemList } from './ItemList';
import { useAsync } from '@/common/hook/useAsync';
import { memo } from 'react';
import { getAllProducts } from '@/service/db/productsMongo';
import { useLocation } from 'react-router-dom';
import { CategoryContext } from '@/product/context/categoryProvider';

const ItemListMemoized = memo(ItemList);

export function ItemlistContainer({ greeting }) {
  const { selectedCategory } = useContext(CategoryContext);
  const location = useLocation();
  const isSearchPage = location.pathname.includes('/search/');
  const categoryToFetch = isSearchPage
    ? location.pathname.split('/search/')[1]
    : selectedCategory;

  console.log('Category to fetch:', categoryToFetch); 
  console.log('Selected category from context:', selectedCategory);

  const currentPageParam = new URLSearchParams(location.search).get('page');
  const [currentPage, setCurrentPage] = useState(parseInt(currentPageParam) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');

  const asyncFunction = async () => {
    console.log('Fetching products with category:', categoryToFetch);
    try {
      const response = await getAllProducts(sortOrder, currentPage, 12, categoryToFetch);
      console.log('API response:', response);
      setTotalPages(response.totalPages); // Asigna el número total de páginas
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  const { data: products, loading, error } = useAsync(asyncFunction, [currentPage, categoryToFetch, sortOrder]);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', currentPage);
    const newUrl = categoryToFetch
      ? `/categoria/${categoryToFetch}?${queryParams.toString()}`
      : `/?${queryParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  }, [currentPage, categoryToFetch, location.search]);

  if (loading) {
    return <h1>Se están cargando los productos...</h1>;
  }

  if (error || !products || !products.payload || products.payload.length === 0) {
    return <h1>No hay productos disponibles en esta categoría</h1>;
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md ${currentPage === i ? 'bg-[#61005D] text-white' : 'bg-white text-black'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='item-list-container'>
      <h2 className='my-4 font-bold'>Nuestros Productos</h2>
      <div className='flex justify-end mb-4'>
        <label className='mr-2'>Ordenar por:</label>
        <select value={sortOrder} onChange={handleSortOrderChange} className='border border-gray-300 rounded-md'>
          <option value='desc'>Más caro a más barato</option>
          <option value='asc'>Más barato a más caro</option>
        </select>
      </div>
      <ItemListMemoized products={products.payload} />
      <div className='flex justify-center mt-5'>
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}
