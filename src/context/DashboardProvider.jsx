import {createContext,useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axios';



const DashboardContext = createContext()
const DashboardProvider = ({children})=>{
     const [productos,setProductos] = useState([]);
     const [panelPedido,setPanelPedido]=useState(true)
     const [modal,setModal]  = useState(false)
     const [pedido,setPedido] = useState([])
     const [producto,setProducto]=useState({})
     const token = localStorage.getItem('AUTH_TOKEN')
     

    const handleClickModal =()=> {
        setModal(!modal);
        
    }
    const handleSetProducto = producto =>{
        setProducto(producto)
    }
     const handleAgregarAlPedido = ({imagen,...producto})=>{
        if(pedido.some(pedidoState=>pedidoState.id === producto.id)){
            const pedidoActualizado=pedido.map(
                pedidoState =>pedidoState.id ===producto.id ? producto : pedidoState
                )   
            setPedido(pedidoActualizado)         
        }
        else{

            setPedido([...pedido,producto]);
        }
     }

     const handleEliminarProductoPedido = id =>{
        const pedidoActualizado = pedido.filter(producto=>producto.id !== id)
        setPedido(pedidoActualizado) 
     }
     const handleSubmitNuevoPedido = async (client_name,telephone,estacion)=> {
        try {
            await axiosClient.post('/api/pedidos',{
                total:pedido.reduce((sum,item)=>sum+item.precio*item.cantidad,0),
                client_name: client_name.current.value,
                telephone:telephone.current.value,
                estacion:estacion,
                productos: pedido.map(producto=>{
                    return {
                        id:producto.id,
                        cantidad:producto.cantidad
                    }
                })
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
        } catch (error) {
            console.log(error)
        }
     }
     const handleSubmitCompletado = async id =>{
        const token  = localStorage.getItem('AUTH_TOKEN')
        try {
            await axiosClient.put(`/api/pedidos/${id}`,null,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success('Pedido completado')
            
        } catch (error) {
            console.log(error)
        }
     }
     const handleSubmitEditarProductos = async (id,datos) =>{
        const token  = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data}= await axiosClient.put(`/api/productos/${id}`,datos,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            
        } catch (error) {
            console.log(error)
        }
        getProducts()
     }

     const getProducts = async () => {
        try {
            
            const {data}  =  await axiosClient('/api/productos',{
                headers:{Authorization:`Bearer ${token}`}})
                setProductos(data.data)
        } catch (error) {
            console.log(error)
        }
     }
     useEffect(()=>{
        getProducts();
     },[])
    
    return(
        <DashboardContext.Provider  value={{
                productos,
                getProducts,
                panelPedido,
                modal,
                producto,
                handleSetProducto,
                handleClickModal,
                setPanelPedido,
                pedido,
                handleAgregarAlPedido,
                handleEliminarProductoPedido,
                handleSubmitNuevoPedido,
                handleSubmitCompletado,
                handleSubmitEditarProductos
        }}>
          {children}
         </DashboardContext.Provider>   
    )
}


export {
    DashboardProvider
};

export default DashboardContext;