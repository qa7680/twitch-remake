import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home"
import Nav from "./components/nav/nav";

const RouteSwitch = () => {
    return(
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path = "/" element = { <Home /> } />
            </Routes>
        </BrowserRouter>
    )
};

export default RouteSwitch;