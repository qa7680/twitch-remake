import React, { useEffect, useState } from "react";
import "./home.scss"
import { Link } from "react-router-dom";

const Home = () => {
    // useEffect(() => {
    //     fetch(`https://api.twitch.tv/helix/videos?game_id=417752`, {
    //         mode: "cors", method: "GET", headers: {
    //             "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
    //             "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res => console.log(res))
    //         .catch(err => console.error(err));
    // })

    const [ topChannels, setTopChannels ] = useState([]);
    const [ randomChannels, setRandomChannels ] = useState([]);
    const [ topGames, setTopGames ] = useState([]);
    const [ current, setCurrent ] = useState(0);

    const nextSlide = () => {
        setCurrent(current === randomChannels.length - 1 ? 0 : current + 1)
    };

    const previousSlide = () => {
        setCurrent(current === 0 ? randomChannels.length-1 : current - 1 )
    };

    useEffect(() => {
        fetch(`https://api.twitch.tv/helix/streams?first=100`, {
            mode: "cors", method: "GET", headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
            }
        })
            .then(res=>res.json())
            .then(res=>{
                const randomizeArr = res.data.slice(5, res.data.length).sort((a,b) => 0.5 - Math.random());
                setRandomChannels(randomizeArr.slice(0,5));
                fetch(`https://api.twitch.tv/helix/games/top?first=10`, {
                    mode: "cors", method: "GET", headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                    }
                })
                    .then(resTwo=>resTwo.json())
                    .then(resTwo=>{
                        setTopGames(resTwo.data)
                        const topChannelsIds = res.data.slice(0,10).reduce((previousUrl, currentUrl) => 
                        previousUrl + `id=${currentUrl.user_id}&`,
                        ""
                        )
                        fetch(`https://api.twitch.tv/helix/users?${topChannelsIds}`, {
                            mode: "cors", method: "GET", headers: {
                                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                            } 
                        })
                            .then(resThree=>resThree.json())
                            .then(resThree=>{
                                resThree.data.forEach((user) => {
                                    for(let i = 0 ; i<res.data.slice(0,10).length; i++){
                                        if(res.data[i].user_login === user.login){
                                            setTopChannels(
                                                (topChannels) => [...topChannels, {
                                                    name: user.display_name,
                                                    image: user.profile_image_url,
                                                    game: res.data[i].game_name,
                                                    viewers: res.data[i].viewer_count,
                                                    title: res.data[i].title,
                                                    thumbnail: res.data[i].thumbnail_url
                                                }]
                                            )
                                        }
                                    }
                                })
                            })
                            .catch(err=>console.error(err));
                    })
                    .catch(err=>console.error(err));
            })
            .catch(err=>console.error(err));
    },[])

    return(
        <div className="homeContainer">
            <div className="videoSliderContainer">
                <img onClick={previousSlide} className="leftArrowSlide" style={{width: "24px", height: "24px"}} src={require('../../icons/leftArrowSlide.png')}></img>
                <img onClick={nextSlide} className="rightArrowSlide" style={{width: "24px", height: "24px"}} src={require('../../icons/rightArrowSlide.png')}></img>
                {randomChannels.map((channel, index) => {
            return <div className={index === current ? "slideActive" : "slide"}>
                    {index === current &&
                        <iframe className="homePageStreamIframe" src={`https://player.twitch.tv/?channel=${channel.user_login}&parent=qa7680-twitch-clone.netlify.app`}
                        width = "600px"
                        height = "340px"
                        allowFullScreen = "true"/>
                    }
                    </div>
                })}
            </div>
            <div className="liveHomeChannels">
                <div className="liveHomeChannelsSuggestion">
                    Live channels we think you'll like
                </div>
                <div class="liveChannelsHomeContainer">
                    {topChannels.map((channel) => {
                                return <div class="liveHomeChannelsContainer">
                            <div className="liveHomeChannelsVideoAndInfo">
                                <Link to = {`/${channel.name}`}>
                                <div className="liveHomeChannelsVideoAndInfoTop">
                                        <div className="liveHomeChannelsVideoAndInfoTopLive">LIVE</div>
                                        <div className="liveHomeChannelsVideoAndInfoTopViewers">
                                            {channel.viewers > 1000 ?
                                                <div className="liveHomeChannelsVideoAndInfoTopViewersBox">
                                                    {(channel.viewers/1000).toFixed(1)}k viewers
                                                </div>
                                            :
                                                <div className="liveHomeChannelsVideoAndInfoTopViewersBox">
                                                    {channel.viewers}viewers
                                                </div>
                                            }
                                        </div>
                                        <img className="liveHomeChannelsVideoAndInfoTopViewersImage" src={channel.thumbnail.replace("{width}x{height}", "293x165")}></img>
                                </div>
                                </Link>
                                <div className="liveHomeChannelsVideoAndInfoDescription">
                                    <div className="liveHomeChannelsVideoAndInfoDescriptionLeft">
                                    <Link to = {`/${channel.name}`}><img className="liveHomeChannelsVideoAndInfoDescriptionLeftImage" src={channel.image}></img></Link>
                                    </div>
                                    <div className="liveHomeChannelsVideoAndInfoDescriptionRight">
                                            <Link to = {`/${channel.name}`}>
                                            <div className="liveHomeChannelsVideoAndInfoDescriptionRightTitle">
                                                {channel.title}
                                            </div>
                                            </Link>
                                            <Link to = {`/${channel.name}`}><div className="liveHomeChannelsVideoAndInfoDescriptionRightName">
                                                {channel.name}
                                            </div>
                                            </Link>
                                            <Link to = {`/directory/game/${channel.game}`}>
                                            <div className="liveHomeChannelsVideoAndInfoDescriptionRightGame">
                                                {channel.game}
                                            </div>
                                            </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                
            </div>
            <div className="liveHomeCategories">
                <div className="categoriesSuggestion">
                <span className="categoriesInPurple">Categories</span> we think you'll like
                </div>
                <div class="homeGamesContainer">
                    {topGames.map((game) => {
                        return <div className="homeGameContainer">
                            <Link to = {`/directory/game/${game.name}`}><img src={game.box_art_url.replace("{width}x{height}", "172x219")}></img></Link>
                            <Link to = {`/directory/game/${game.name}`}><div className="homeGameTitle">{game.name}</div></Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
export default Home;