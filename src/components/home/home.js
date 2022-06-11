import React, { useEffect } from "react";
import "./home.scss"

const Home = () => {
    // useEffect(() => {
    //     fetch(`https://api.twitch.tv/helix/videos?game_id=493057`, {
    //         mode: "cors", method: "GET", headers: {
    //             "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
    //             "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res => console.log(res))
    //         .catch(err => console.error(err));
    // })
    return(
        <div className="homeContainer">
            Home Page
        </div>
    )
}
export default Home;