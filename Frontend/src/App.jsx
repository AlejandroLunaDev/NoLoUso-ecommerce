import { CartProvider } from "./context/CartContext";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return(
   <CartProvider>
     <AppRoutes />
   </CartProvider> 
    
    ) 
}

