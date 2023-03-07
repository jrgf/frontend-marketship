import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

useEffect

export default function MainLayout() {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('auth/login')
  },[])
  return (
    <>
    </>
  )
}
