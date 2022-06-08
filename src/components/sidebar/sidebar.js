import React, { useEffect, useState } from "react";
import "../sidebar/sidebar.scss"
import { Link } from "react-router-dom";

const Sidebar = () => {

    const [ expand, setExpand ] = useState(true);
    const [ topStreamers, setTopStreamers ] = useState([]);

    const hideShow = () => {
        setExpand(!expand)
    };
    const fetchTopStreamers = () => {
        fetch('https://api.twitch.tv/helix/streams?first=100',
        {mode: "cors",method: "GET", headers:{
            "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
            "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
        }}) 
            .then(res => {return res.json() })
            .then(res => {

                //call top 100 streamers, randomize and then pick 15
                let topFiftyStreamers = res.data;
                topFiftyStreamers.sort((a,b) => Math.random() - 0.5);
                topFiftyStreamers = topFiftyStreamers.slice(0,15);

                topFiftyStreamers.forEach((streamer) => {        
                    fetch(`https://api.twitch.tv/helix/users?login=${streamer.user_login}`,
                    {mode: "cors",method: "GET", headers:{
                        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                    }})
                        .then(res => res.json())
                        .then(data => {
                            setTopStreamers(topStreamers => [...topStreamers, {name: data.data[0].display_name,
                                views: streamer.viewer_count, image: data.data[0].profile_image_url,
                            game: streamer.game_name, title: streamer.title, login: streamer.user_login}])
                        })
                        .catch(err => console.error(err))
                })
            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        setTopStreamers([]);
        fetchTopStreamers();
    }, [])

    return(
        <div className="sidebar">
            {expand ?
            <div className="sidebarTopShown">
                <div className="rcImgShown">
                    <p>RECOMMENDED CHANNELS</p>
                    <img className="showHideImg" onClick={hideShow} src= {require('../../icons/doubleLeft.png')}
                    title="Collapse"/>
                </div>
                {topStreamers.map((streamer) => 
                <Link to ={ `${streamer.login}` } className="streamerLink">
                <div className="userContainer" data-tooltip={streamer.title}>
                    <div className="usersExpanded">
                        <div className="picAndUser">
                            <div>
                                <img className="imgRC" src={streamer.image} style={{width: "30px", height: "30px"}}></img>
                            </div>
                            <div className="userSidebarTxt">
                                <div className="streamerName">{`${streamer.name}`}</div>
                                <div className="gameName">{`${streamer.game}`}</div>
                            </div>
                        </div>
                        <div className="viewCount">
                            <div className="liveIcon"></div>
                            <div>{`${parseFloat((streamer.views/1000).toFixed(1))}k`}
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
                )}
            </div>
            :
            <div className="sidebarTopHidden">
                <div>
                    <img className="showHideImgHidden" onClick={hideShow} style={{transform:"rotate(180deg)"}} src= {require('../../icons/doubleLeft.png')}
                    title = "Expand"/>
                </div>
                {topStreamers.map((streamer) => 
                <Link to ={ `${streamer.login}` } className="streamerLink">
                <div class="userContainerHidden" data-tooltip={`${streamer.name} - ${streamer.game}`} >
                    <div className="userCollapsed">
                        <img className="imgRC" src={streamer.image} style={{width: "30px", height: "30px"}}></img>
                    </div>
                </div>
                </Link>
                )}
            </div>
            }
        </div>
    )
}
export default Sidebar;