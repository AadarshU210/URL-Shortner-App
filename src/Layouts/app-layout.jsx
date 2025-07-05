import Header from "@/components/Header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <div>
            <main className="container mx-auto px-12 min-h-screen">
                <Header />
                <Outlet />
            </main>

            <div className="p-10 text-center bg-gray-800 mt-10">
                <a className="text-white">Contact Us</a>
            </div>
        </div>
    )
}

export default AppLayout