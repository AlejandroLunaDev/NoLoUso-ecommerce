import {
  SlSocialInstagram,
  SlSocialGithub,
  SlSocialLinkedin,
  SlSocialFacebook
} from "react-icons/sl";
import { getAllProducts } from "@/service/db/productsMongo";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAsync } from "@/common/hook/useAsync";
useAsync
export function Footer() {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const { categoryId } = useParams()
  const asyncFunction = () =>  getAllProducts(categoryId)
  const { data: products, loading, error } = useAsync(asyncFunction, [categoryId])

  useEffect(() => {
    if (products && products.length > 0) {
      const categoriesSet = new Set(products.map(product => product.category));
      setUniqueCategories(Array.from(categoriesSet));
    }
  }, [products]);





  const handleCategoryClick = async () => {};
  return (
    <footer className="p-2 border-t border-[#61005D] mt-3" >
      <section className="flex justify-around">
      <article>
        <h1 className="text-lg font-semibold">Seguinos</h1>
        <div className="flex gap-3 mt-3">
          <NavLink
            to={"https://github.com/AlejandroLunaDev/NoLoUso-ecommerce"}
            target="_blank"
            className={'social-icon'}
          >
            <SlSocialGithub />
          </NavLink>
          <NavLink
            to={"https://linkedin.com/in/alejandro-luna-dev"}
            target="_blank"
            className={'social-icon'}
          >
            <SlSocialLinkedin />
          </NavLink>
          <SlSocialInstagram className={'social-icon'} />
          <SlSocialFacebook className={'social-icon'} />
        </div>
      </article>
      </section>
      <section className="text-center mt-3">
        <span className="">Copyright © 2024 Alejandro Luna - Design by Alejandro Luna</span>
      </section>
    </footer>
  );
}
