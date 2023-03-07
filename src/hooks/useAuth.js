import { useEffect } from 'react';
import useSWR from 'swr'
import axiosClient from "../config/axios";
import {useNavigate} from 'react-router-dom'



export const useAuth = ({middleware,url})=>{
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()
    const {data:user,error,mutate} = useSWR('/api/user',()=>axiosClient('/api/user',{headers:{
        Authorization:`Bearer ${token}`
    }}))
    
    const login = async (datos,setErrores)=>{
        try {
            const {data} = await axiosClient.post('/api/login',datos);
            localStorage.setItem('AUTH_TOKEN',data.token);
            setErrores([]);
            await mutate();
            
           
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }
    const register = async (datos,setErrores) =>{
        try {
            await axiosClient.post('/api/register',datos);
            setErrores([])
            await mutate()
            navigate('/admin/new_products')
           
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
       
    }
    
    const logout= async ()=>{
        try {
            await axiosClient.post('/api/logout',null,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

   
    useEffect(()=>{
       
        if(middleware==='guest' && url && user && user.data.isSeller && !user.data.isAdmin){
                navigate(url)
        }
        if(middleware==='guest'&& user && !user.data.isSeller && !user.data.isAdmin){
            navigate('/pedidos')
    }
        
        
        if(middleware==='guest' && user && user.data.isAdmin){
            navigate('/admin/new_products')
        }
        if (middleware === 'sellers' && error){
            navigate('/auth/login')
        }
        if (middleware === 'admin' && error){
            navigate('/auth/login')
        }
        if (middleware === 'admin' && user && user.data.isSeller && !user.data.isAdmin){
            navigate('/dashboard')
        }
        if (middleware === 'admin' && user && !user.data.isSeller && !user.data.isAdmin){
            navigate('/pedidos')
        }
        
    },[user,error])





    return {
        login,register,logout,user,error
    }
}