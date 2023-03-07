import {createBrowserRouter, redirect} from 'react-router-dom'
import Login from './components/Login';
import Products from './components/Products';
import Register from './components/Register';
import Pedidos from './components/Pedidos';
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import NewProducts from './components/NewProducts';
import EditProducts from './components/EditProducts';


const router = createBrowserRouter([
    {
        path:'/',
       element:<MainLayout/>
    },
    {
        path:'/auth',
        element: <AuthLayout/>,
        children:[
            {
                path:'/auth/login',
                element:<Login/>
            },
            {
                path:'/auth/register',
                element:<Register/>
            }
        ]

    },{
        path:'/dashboard',
        element:<Layout/>,
        children:[
           { 
                path:'/dashboard/productos',
                element:<Products/>     
           },
           { 
            path:'/dashboard/pedidos',
            element:<Pedidos/>      
           }
        
        ]

    },{
        path:'/admin',
        element:<AdminLayout/>,
        children:[
            {
                path:'/admin/new_products',
                element:<NewProducts/>
        },{
            path:'/admin/edit_products',
            element:<EditProducts/>
        }
            

        ]
    }
]);

export default router;