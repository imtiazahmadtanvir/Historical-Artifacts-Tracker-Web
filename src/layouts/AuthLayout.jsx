import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";



const AuthLayout = () => {
    return (
        <div>
            <div className=" ">
                <div className=" w-full">
                <Navbar></Navbar>
                </div>
                
                <Outlet></Outlet>
                


            </div>
        </div>
    );
};

export default AuthLayout;