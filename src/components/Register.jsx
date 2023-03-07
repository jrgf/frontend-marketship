import {createRef,useState} from "react"
import { Link} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Alert from "./Alert";


export default function Register() {
    const {user,error,register} = useAuth({middleware:'admin'})
   
    const nameRef = createRef();
    const emailRef =  createRef();
    const passwordRef =  createRef();
    const passwordConfirmationRef = createRef();
    const isSellerRef = createRef();

    const [errores,setErrores] = useState([]);
    

    const handleSubmit = async e=>{
        e.preventDefault()
        const datos = {
            name: nameRef.current.value,
            email:emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            isSeller:  parseInt(isSellerRef.current.value)
            
        }
       
        register(datos,setErrores)
       
    }
  return (
    <div>
<h1 className="text-3xl font-bold text-center">Registrar Usuarios</h1>
        <p className="text-slate-600 font-bold mt-5 text-center">Registre a nuevos vendedores y repartidores</p>
        <div className="rounded px-5 py-10 ">
            {errores ? errores.map((error,index)=>{
            return <Alert key={index}>{error}</Alert>}) : []}
            <form 
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="mb-4">                    
                    <label 
                        htmlFor="name" 
                        className="text-slate-800 text-xl font-normal">
                            Nombre:
                    </label>
                   <input 
                       type="text"
                        name="name" 
                        id="name" 
                        className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50" 
                        ref={nameRef}
                        />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="email" 
                        className="text-slate-800 text-xl font-normal">
                            Correo:
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50"
                        ref={emailRef}
                        />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="password" 
                        className="text-slate-800 text-xl font-normal">
                            Contraseña:
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50" 
                        ref={passwordRef}
                        />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="password_confirmation" 
                        className="text-slate-800 text-xl font-normal">
                            Repetir Contraseña:
                    </label>
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        id="password_confirmation" 
                        className="border border-blue-600 rounded-lg mt-2 w-full p-3 bg-gray-50" 
                        ref={passwordConfirmationRef}
                        />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="isSeller" 
                        className="text-slate-800 text-xl font-normal">
                            Tipo de Usuario:
                    </label>
                    <select name="isSeller" id="isSeller"  className="rounded-lg mt-2 w-full p-3 bg-gray-50"
                    ref={isSellerRef}>
                        <option value="1">Vendedor</option>
                        <option value="0">Repartidor</option>

                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-5 w-full text-white font-bold uppercase p-5 bg-indigo-600 rounded-md"
                    >
                        Registrar Usuario
                </button>
            </form>
            
        </div>
            <Link to='/admin' className="mt-10 py-4 font-bold uppercase">
                Administración
            </Link>
    </div>
  )
}
