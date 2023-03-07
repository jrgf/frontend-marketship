import { createRef, useState } from "react"
import { toast } from "react-toastify"
import axiosClient from "../config/axios"

export default function NewProducts() {
    const [errores,SetErrores] =  useState([])
    
    const [imagePreview,SetImagePreview] = useState()
    const [image,setImage] = useState()
    const handleChange = e=>{
        SetImagePreview(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
        }
    const nombreRef = createRef()
    const precioRef  = createRef()
    const stockRef  = createRef()
    const imagenRef  = createRef()
    
    const handleSubmit = async e=>{
        e.preventDefault()
        
        const token = localStorage.getItem('AUTH_TOKEN')
        const datos = {
            nombre: nombreRef.current.value,
            precio:precioRef.current.value,
            stock: stockRef.current.value,
            imagen:image
            
        }
        try {
        
            await axiosClient.post('/api/productos',datos,{headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'multipart/form-data',

            }})
            toast.success('Producto agregado correctamente')
            setTimeout(() => {
                window.location.reload(true)
            }, 8000);
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
        <div className="flex-1 flex flex-col justify-center items-center">
        <div className="rounded px-5 py-10">
            {errores ? errores.map((error,index)=>{
            return <Alert key={index}>{error}</Alert>}) : []}
            <form
                encType="multipart/form-data"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label 
                        htmlFor="nombre" 
                        className="text-slate-800 text-xl font-normal">
                            Nombre Producto
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
                        ref={stockRef}
                         />
                </div>
                
                <div className="mb-4">
                    <label 
                        htmlFor="imagen" 
                        className="text-slate-800 text-xl font-normal">
                            Imagen:
                    </label>
                    <input 
                        type="file" 
                        accept="image/*"
                        name="imagen" 
                        id="imagen" 
                        className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50"
                        onChange={handleChange}
                         />
                         {imagePreview?(<img height='100' width='100' src={imagePreview} alt="Imagen Previa del Producto" />):null}
                </div>
                <button
                    type="submit"
                    className="mt-5 w-full text-white font-bold uppercase p-5 bg-indigo-600 rounded-md"
                    >
                        Registrar Nuevo Producto
                </button>
            </form>
        </div>
        </div>
  )
}
