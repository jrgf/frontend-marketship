import { Outlet } from "react-router-dom"
export default function AuthLayout() {
  return (
    <main className="max-w-2xl m-auto mt-10 md:mt-15 flex flex-col gap-5 items-center shadow">
    <img 
        src="/img/logo.png" 
        alt="Imagen Logo" 
        className=" max-w-xs"
    />
    <div>
    <Outlet/>
    </div>
    </main>
  )
}
