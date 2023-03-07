import useDashboard from "../hooks/useDashboard"
import Select from 'react-select'
import {toast} from 'react-toastify'
import { formatCurrency } from "../helpers"
import { createRef, useState} from "react"
import { estaciones } from "../data/estaciones"



export default function ResumenPedido() {
  const [estacion,setEstacion] = useState()

  const clientNameRef = createRef()
  const telephoneRef = createRef()
 
  const options = estaciones.map((estacion,index)=>{
    return {
      label:estacion.NOMBRE,
      value: estacion.NOMBRE,
    }
  })
 

  const {pedido,handleEliminarProductoPedido,handleSubmitNuevoPedido} = useDashboard()
  const handleChange  = e =>{
    setEstacion(e.value)
  }
  const handleSubmit = e =>{
     e.preventDefault()
     handleSubmitNuevoPedido(clientNameRef,telephoneRef,estacion) 
     toast.success('Pedido realizado!')
     clientNameRef.current.value=""
     telephoneRef.current.value=""
     setEstacion("")
  }
  return (
    <div className="w-72 flex flex-col overflow-y-scroll">
       <h1 className="font-black text-3xl">Resumen</h1>
       <form
        onSubmit={handleSubmit}
        noValidate
       >
        <div className="mb-4 m-3">
        <label 
          htmlFor="client_name" 
          className="text-slate-800 text-xl font-normal">
            Nombre del Cliente:
        </label>
          <input 
            type="text" 
            name="client_name" 
            id="client_name" 
            className="border border-blue-600 rounded-lg mt-2 w-full p-2 bg-gray-50" 
            ref={clientNameRef}/>
                
        </div>
        <div className="mb-4 m-3">
        <label 
          htmlFor="telephone" 
          className="text-slate-800 text-xl font-normal">
            Telefono:
        </label>
          <input 
            type="number" 
            name="telephone" 
            id="telephone" 
            className="border border-blue-600 rounded-lg mt-2 w-full p-2 bg-gray-50 
             appearance-none" 
            ref={telephoneRef}/>
                
        </div>
        <div className="mb-4 m-3">
        <label 
          htmlFor="estacion" 
          className="text-slate-800 text-xl font-normal">
            Estación:
        </label>
          <Select
            className="border appearance-none border-blue-600 rounded-lg mt-2 w-full p-2 bg-gray-50"
            options={options} placeholder="Escoge la estación" id="estacion" name="estacion" onChange={handleChange}/>
          
            
          </div>
          <div
            className="py-10"
          >
              {
                pedido.length === 0 ?(
                <p>
                  No hay productos agregados todavía
                </p>):(
                  pedido.map(producto=>(
                    <div 
                      className="mb-5"
                      key={producto.id}>
                        <p>{producto.nombre}</p> 
                        <p>Cantidad: {producto.cantidad}</p>
                        <button 
                          className="bg-red-700 text-white font-bold uppercase text-center rounded-sm px-2"
                          onClick={()=>{handleEliminarProductoPedido(producto.id)}}>
                          Eliminar
                        </button>
                        <p>Subtotal: {formatCurrency(producto.cantidad*producto.precio)}</p>
                    </div>
                  ))
                )
              }
              <p>Total: {formatCurrency(pedido.reduce((sum,item)=>sum+item.precio*item.cantidad,0))}</p>
              
          </div>
          {pedido.length===0 ? 
            (<button type="submit" className="bg-zinc-600 text-white font-bold uppercase p-3  m-4 rounded-sm" disabled>
              Confirmar Pedido
            </button>) : (
              <button type="submit" className="bg-teal-600 text-white font-bold uppercase p-3  m-4 rounded-sm">
              Confirmar Pedido
            </button>
            )
          }
          
          
       </form>
    </div>
  )
}
