import { useEffect } from "react"
import EditProduct from "./EditProduct"
import useDashboard from '../hooks/useDashboard'
import { useAuth } from "../hooks/useAuth"

export default function EditProducts() {
  useAuth({middleware:'admin'});
  const {productos} = useDashboard()
  
 
  return (
    <div className="flex-1 overflow-y-scroll h-screen w-full overflow-hidden">
    
      <h1 className="text-3xl font-black text-center">Productos Disponibles</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {productos.map(producto=>(<EditProduct product={producto} key={producto.id} />))}
      </div>
      <div>
        
      </div>
    </div>
    
    )
}
