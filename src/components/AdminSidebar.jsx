import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {
    const {logout} = useAuth({middleware:'admin'})
  return (
    <aside className={`min-h-screen p-2 top-0 left-0 w-54 flex flex-col items-center`}>
            <img src="/img/logo.png" alt="Imagen Logo"  className=" max-w-5 md:max-w-10"/>

            <Link to='/admin/new_products' 
            className="p-4 mb-2 bg-indigo-600 w-full text-center font-bold text-white text-xs cursor-pointer"
              >
                Registrar Nuevos Productos
            </Link>
            <Link to='/admin/edit_products' 
            className="p-4 mb-2 bg-indigo-600 w-full text-center font-bold text-white text-xs cursor-pointer"
              >
                Editar/Eliminar Productos
            </Link>
            <Link to='/auth/register' 
            className="p-4 mb-5 bg-indigo-600 w-full text-center font-bold text-white text-xs cursor-pointer"
            >
               Registrar Nuevos Usuarios
            </Link>
            <button
                className="p-4 mb-2 bg-red-600 w-full text-center font-bold text-white text-xs cursor-pointer"
                onClick={logout}
                >
                    Cerrar Sesión
            </button>
    </aside>
  )
}
