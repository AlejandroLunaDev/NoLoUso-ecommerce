import {
  SlSocialInstagram,
  SlSocialGithub,
  SlSocialLinkedin,
  SlSocialFacebook
} from "react-icons/sl";
import categoriaData from "../components/Ui/InputSearch/categorias.json";
import { NavLink } from "react-router-dom";

export function Footer() {
  const handleCategoryClick = async () => {};
  return (
    <footer className="p-2 border-t border-[#61005D] mt-3" >
      <section className="flex justify-around">
      <article>
        <h1 className="text-lg font-semibold">Seguinos</h1>
        <div className="flex gap-3 mt-3">
          <NavLink
            to={"https://github.com/AlejandroLunaDev/nlu-ecommerce"}
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
      <article>
        <h1 className="text-lg font-semibold">Categorias</h1>
        {categoriaData.categorias.map((categoria, index) => (
          <NavLink
            to={`/categoria/${categoria.name.toLowerCase()}`}
            key={index}
            onClick={() => handleCategoryClick(categoria.name)}
          >
            <p className="text-sm hover:border-b border-[#61005D]">{categoria.name}</p>
          </NavLink>
        ))}
      </article>
      </section>
      <section className="text-center mt-3">
        <span className="">Copyright © 2024 Alejandro Luna - Design by Alejandro Luna</span>
      </section>
    </footer>
  );
}
