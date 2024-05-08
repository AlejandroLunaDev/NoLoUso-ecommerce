import { NavLink } from "react-router-dom"
import { routes} from '@/routes/routes'
import { Nolouso } from "../components"


export  function Error404() {
  return (
    <section className=" w-full h-dvh flex flex-col justify-center items-center gap-3">
    <span className="  text-9xl font-bold">404</span>
    <p className="text-xl">La Página que intentas solicitar no está en el servidor (Error404)</p>
    <p className="text-xl">vuelve al Inicio <NavLink className='font-semibold text-xl text-[#61005D] ' to={routes.home}>Inicio</NavLink></p>
    <NavLink to={routes.home}>
    <Nolouso />
    </NavLink>
  </section>
  )
}
