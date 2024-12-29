import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Protected from "./protected";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { isAuthenticated } from "./helpers";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<Protected />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<Home />} />,
            <Route path="/login" element={<Login />} loader={async () => await isAuthenticated()} />,
            <Route path="/register" element={<Register />} loader={async () => await isAuthenticated()} />
            <Route path="*" element={<Home />} />
        </Route>
    )
);

const Index = () => {
    return <RouterProvider router={router} />
};


export default Index;