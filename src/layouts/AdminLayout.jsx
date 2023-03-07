import { Outlet } from "react-router-dom"
import Modal from 'react-modal'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import AdminSidebar from "../components/AdminSidebar"
import { useAuth } from "../hooks/useAuth"
import useDashboard from "../hooks/useDashboard"
import ModalProducto from "../components/ModalProducto"
export default function AdminLayout() {
    const {modal,handleClickModal} = useDashboard();
    const {user,error}=useAuth({middleware:'admin'})
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    Modal.setAppElement('#root');
  return (
    <>
    <main className="flex flex-row gap-5">
        <AdminSidebar/>
        <Outlet/>
    </main>
  
        <Modal isOpen={modal} style={customStyles}>
           <ModalProducto/>
        </Modal>
        <ToastContainer/>
    </>
  )
}
