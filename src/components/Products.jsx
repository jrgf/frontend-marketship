import { useEffect } from "react"
import Product from "./Product"
import useDashboard from '../hooks/useDashboard'
import { useAuth } from "../hooks/useAuth"

export default function Products() {
  
  const {productos,setPanelPedido} = useDashboard()
 
  useEffect(()=>{
    setPanelPedido(true)
    productos
  },[])
  return (
    <div className="flex-1 overflow-y-scroll h-screen w-full overflow-hidden">
    
      <h1 className="text-3xl font-black text-center">Productos Disponibles</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {productos.map(producto=>(<Product product={producto} key={producto.id} />))}
      </div>
      <div>
        
      </div>
    </div>
    
    )
}
