import {createRef,useState} from "react"
import Alert from "./Alert";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    
    const emailRef =  createRef();
    const passwordRef =  createRef();
    const {login}  = useAuth({middleware:'guest',url:'/dashboard/productos'})
    const [errores,setErrores] = useState([]);

    const handleSubmit =  e=>{
        e.preventDefault()
        const datos = {
           
            email:emailRef.current.value,
            password: passwordRef.current.value,
            
        }
       
        
        login(datos,setErrores)
       
     
    }
       
  return (
    <>
        <h1 className="text-3xl font-bold text-center">Inicia Sesión</h1>
        <p className="text-slate-600 font-bold mt-5 text-center">Inicia sesión si eres repartidor o vendedor de MarketShip</p>
        <div className="rounded px-5 py-10 ">
            {errores ? errores.map((error,index)=>{
            return <Alert key={index}>{error}</Alert>}) : []}
            <form
                onSubmit={handleSubmit}
                noValidate
            >
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
                        ref={emailRef}/>
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
                        ref={passwordRef} />
                </div>
                <button
                    type="submit"
                    className="mt-5 w-full text-white font-bold uppercase p-5 bg-indigo-600 rounded-md"
                    >
                        Iniciar Sesión
                </button>
            </form>
        </div>
         
    </>
  )
}
