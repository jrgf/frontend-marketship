import useDashboard from '../hooks/useDashboard.js'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { formatCurrency } from '../helpers/index.js'
import axiosClient from '../config/axios.js'
export default function EditProduct({product}) {
   const {handleClickModal,handleSetProducto,getProducts} = useDashboard()
   const [stock,setStock] = useState(product.stock)
   const serverURL = import.meta.env.VITE_API_URL;
   
   const handleClickEliminarProducto = async id =>{
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        await axiosClient.delete(`/api/productos/${id}`,{headers:{
            Authorization:`Bearer ${token}`
        }})
        getProducts();
        toast.success('Producto eliminado correctamente')
    } catch (error) {
        console.log(error)
    }
  }
  
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
                
                
                
                        <button 
                        className="bg-teal-600 text-white uppercase font-bold text-center w-full mt-5"
                        onClick={()=>{
                            handleClickModal();
                            handleSetProducto(product);
                        }}  
                    >
                            Editar Producto
                    </button>
                    <button 
                        className="bg-red-600 text-white uppercase font-bold text-center w-full mt-5"
                        onClick={()=>handleClickEliminarProducto(product.id)}
                    
                    >
                            Eliminar Producto
                    </button>
        </div>
    </>
                


  )
}
