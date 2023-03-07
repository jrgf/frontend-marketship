import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Sidebar from "../components/Sidebar"
import ResumenPedido from "../components/ResumenPedido"
import useDashboard from "../hooks/useDashboard"
import { useAuth } from "../hooks/useAuth"
export default function Layout() {
  const {user,error} = useAuth({middleware:'sellers'
  })
  const {panelPedido} = useDashboard()
  return (
    
    <main className="flex flex-row gap-5 "> 
      
      <Sidebar/>
      <div>
        <Outlet/>
      </div>
    {panelPedido &&(

        <ResumenPedido/>
    )
     
      
      
    }
    <ToastContainer/> 
    </main>
  )
}
