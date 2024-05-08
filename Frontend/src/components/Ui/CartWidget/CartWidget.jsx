import { Cart } from "@/components/icons/Cart";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState } from "react";
import { SidebarCart } from "../../Drawer/SidebarCart";
import { Drawer } from "@mui/material";

export function CartWidget() {
  const { totalQuantity, total } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
    <article className="flex">
      <button onClick={() => setOpen(true)}>
        <Cart />
      </button>
      <div className=" bg-[#61005D] text-white rounded-full text-center text-sm w-5 h-5">
        {totalQuantity}
      </div>

      <Drawer
        style={{ zIndex: 999 }}
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
      >
        <SidebarCart isOpen={open} setOpen={setOpen} />
      </Drawer>
    </article>
  );
}
