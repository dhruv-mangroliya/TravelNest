import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return(
        <div className=" px-5 py-3 d-flex flex-column">
            <Header/>
            <Outlet/>
        </div>
    )
}