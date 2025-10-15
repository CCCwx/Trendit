import Layout from "@/page/Layout";
import Login from "@/page/Login";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute"
const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <AuthRoute>
            <Layout/>
        </AuthRoute>
        
    },
    {
        path:"/Login",
        element:<Login/>
    }

])

export default router