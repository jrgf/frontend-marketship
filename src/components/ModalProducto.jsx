import useDashboard from "../hooks/useDashboard";
import {createRef} from 'react'



export default function ModalProducto() {
    const serverURL = import.meta.env.VITE_API_URL;
    const nombreRef = createRef()
    const precioRef = createRef()
    const cantidadRef = createRef()
    const {producto,handleClickModal,handleSubmitEditarProductos} = useDashboard()
    const handleSubmit = e=>{
        e.preventDefault();
        const datos={
            nombre:nombreRef.current.value,
            precio:precioRef.current.value,
            stock:cantidadRef.current.value
        }
        handleSubmitEditarProductos(producto.id,datos)
    }
    
  return (
    <>
        <div className="md:flex flex-col gap-10 overflow-y-scroll h-screen w-full">
        <img className=" max-w-fit h-80 block ml-auto mr-auto " src={`${serverURL}/img/${producto.imagen}`} alt="Imagen Producto Modal" />

            <form
                onSubmit={handleSubmit}
            >
                    <div className="mb-4">                    
                            <label 
                                htmlFor="nombre" 
                                className="text-slate-800 text-xl font-normal">
                                Nombre:
                            </label>
                            <input 
                                    type="text"
                                    name="nombre" 
                                    id="nombre" 
                                    className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50"
                                    ref={nombreRef}
                        />
                    </div>
                    <div className="mb-4">                    
                            <label 
                                htmlFor="precio" 
                                className="text-slate-800 text-xl font-normal">
                                Precio:
                            </label>
                            <input 
                                    type="number"
                                    name="precio" 
                                    id="precio" 
                                    className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50" 
                                    ref={precioRef}
                        />
                    </div>
                    <div className="mb-4">                    
                            <label 
                                htmlFor="stock" 
                                className="text-slate-800 text-xl font-normal">
                                Cantidad:
                            </label>
                            <input 
                                    type="number"
                                    name="stock" 
                                    id="stock" 
                                    className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50" 
                                    ref={cantidadRef}

                        />
                    </div>
                    <div className="flex gap-5">
                        
            <button 
                className="bg-teal-600 text-white uppercase font-bold p-3 text-center mt-5 mb-4" 
                type="submit"
            >
                Guardar
            </button>
            <button
                type="button"
                className="bg-red-600 text-white uppercase font-bold p-3 text-center mt-5 mb-4"
                onClick={()=>{handleClickModal()}}
            >
                Cerrar 
            </button>
        </div>
            </form>
        
        
        </div>
        
    
    </>
  )
}
