import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home"
import Nav from "./components/nav/nav";
import Sidebar from "./components/sidebar/sidebar";
import "../src/RouteSwitch.scss";
import Streamer from "./components/streamer/streamer";
import Directory from "./components/directory/directory";

const RouteSwitch = () => {
    return(
        <BrowserRouter>
            <div class="containerAll">
                <Nav />
                <div className="mainStuff">
                    <Sidebar />
                    <Routes>
                        <Route path = "/" element ={ <Home /> } />
                        <Route path = "/:streamer" element={ <Streamer />} />
                        <Route path = "/directory" element = { <Directory /> } />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
};

export default RouteSwitch;