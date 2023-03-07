import React from 'react'
import ReactDOM from 'react-dom/client'
import { DashboardProvider } from './context/DashboardProvider'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DashboardProvider>
          <RouterProvider router={router}>
            
            </RouterProvider>
          
    </DashboardProvider>
    

  </React.StrictMode>,
 
)
