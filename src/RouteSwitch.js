import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home"
import Nav from "./components/nav/nav";
import Sidebar from "./components/sidebar/sidebar";
import "../src/RouteSwitch.scss";

const RouteSwitch = () => {
    return(
        <BrowserRouter>
            <Nav />
            <div className="mainStuff">
                <Sidebar />
                <Routes>
                    <Route path = "/" element = { <Home /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
};

export default RouteSwitch;