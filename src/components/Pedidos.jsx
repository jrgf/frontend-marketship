import { useEffect } from "react";
import useSWR from 'swr';
import axiosClient from "../config/axios";
import { DashboardProvider } from "../context/DashboardProvider";
import { formatCurrency } from "../helpers";
import useDashboard from "../hooks/useDashboard";


export default function Pedidos() {
  const {setPanelPedido, handleSubmitCompletado}  = useDashboard()
 useEffect(()=>{
  setPanelPedido(false)
},[])
 
 
  const token  = localStorage.getItem('AUTH_TOKEN')
 const fetcher  = ()=>axiosClient('/api/pedidos',{
  headers:{
    Authorization:`Bearer ${token}`
  }
 })

 const {data,isLoading,error} = useSWR('/api/pedidos',fetcher)
 if (isLoading) return 'Cargando...'
 
  return (
      <div className="flex-1 overflow-y-scroll h-screen w-full overflow-hidden">
          <h1 className="text-3xl font-black text-center">Tus pedidos</h1>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5" >
                  {data.data.pedidos.map(pedido=>(
                    <div key={pedido.id} className="border-sm p-3 rounded-sm bg-gray-200">
                      <p className="m-5 font-bold border-b border-gray-600">
                        Cliente: <span className="font-normal">{pedido.client_name}</span> </p>
                      <p className="m-5 font-bold border-b border-gray-600">
                        Telefono: <span className="font-normal">{pedido.telephone}</span> </p>
                      <p className="m-5 font-bold border-b border-gray-600">
                        Estación: <span className="font-normal">{pedido.estacion}</span> </p>
                      
                      <div>
                        <p className="text-teal-600 m-5 uppercase font-bold border-b border-gray-600">
                          Contenido del pedido:
                        </p>
                        <ul>
                          {pedido.productos.map((producto,index)=>(
                            <div key={index}>
                            <li  className="m-7">
                                  - {producto.nombre}
                            </li>
                            <li  className="m-7">
                                  - Precio: {formatCurrency(producto.precio)}
                            </li>
                            <li  className="m-7">
                                  - Cantidad : {producto.pivot.cantidad}
                            </li>
                            </div>
                          ))}
                        </ul>
                          <p className="m-5 font-bold border-b border-gray-600">
                        Total a pagar: <span className="font-normal">{formatCurrency(pedido.total)}</span> </p>
                       <button
                       onClick={()=>handleSubmitCompletado(pedido.id)}
                       className="bg-blue-600 p-2 text-white font-bold text-xl uppercase w-full"
                       >
                            Completado
                       </button>
                    </div>
                    </div>
                    
                  ))}
            </div>

      </div>
  )
}
