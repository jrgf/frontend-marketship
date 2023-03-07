import useDashboard from '../hooks/useDashboard.js'
import { useState } from 'react'
import { formatCurrency } from '../helpers/index.js'
export default function Product({product}) {
   const{handleAgregarAlPedido} = useDashboard()
   const [cantidad,setCantidad] = useState(0)
   const [stock,setStock] = useState(product.stock)
   const serverURL = import.meta.env.VITE_API_URL;
  
  return (
    <>
        <div className='mt-5 p-10 border-zinc-600 
        rounded-sm shadow '>
                <img className=" max-w-fit h-80 block ml-auto mr-auto " src={`${serverURL}/img/${product.imagen}`} alt={`Imagen ${product.nombre}`} />

                <p className=" font-bold">
                    Nombre del Producto:   
                    <span className="font-normal">
                        {" "+product.nombre}
                    </span>
                </p>
                <p className=" font-bold">
                    Precio:   
                    <span className="font-normal">
                        {" "+formatCurrency(product.precio)}
                    </span>
                </p>
                <p className=" font-bold">
                    En Almacen:   
                    <span className="font-normal">
                        {
                            stock
                        }
                    </span>
                </p>
                < div className='flex flex-row-reverse justify-between py-5'>
                    <button 
                    onClick={()=>{
                        if(cantidad>=product.stock) return
                        setCantidad(cantidad+1)
                        setStock(stock-1)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                    <p className='font-bold text-orange-600 text-xl'>Cantidad: <span className='text-black font normal'>{cantidad}</span></p>
                    <button
                        onClick={()=>{
                            
                         if(cantidad<=0) return
                         setCantidad(cantidad-1)
                         setStock(stock+1)}
                        }
                        
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </button>
                </div>
                {
                    product.stock === 0 ? 
                    (<button className="bg-gray-600 text-white uppercase font-bold text-center w-full mt-5" disabled>
                                No disponible
                    </button>):(
                        <button 
                        className="bg-teal-600 text-white uppercase font-bold text-center w-full mt-5"
                        onClick={()=>{
                            if(cantidad===0)return
                            handleAgregarAlPedido({...product,cantidad})}}  
                    >
                            Agregar al Pedido
                    </button>
                    )
                }
                

        </div>
    </>
  )
}
