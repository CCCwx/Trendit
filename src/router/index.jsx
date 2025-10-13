import Layout from "@/page/Layout";
import Login from "@/page/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>
    },
    {
        path:"/Login",
        element:<Login/>
    }

])

export default router