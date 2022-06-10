import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./directory.scss"

const Directory = () => {

    const [ categories, setCategories ] = useState(true);
    const [ liveChannels, setLiveChannels ] = useState(false);
    const [ topGames, setTopGames ] = useState([]);
    const [ topStreams, setTopStreams ] = useState([]);

    const clickedCategories = () => {
        setCategories(true);
        setLiveChannels(false);
    };

    const clickedLiveChannels = () => {
        setCategories(false);
        setLiveChannels(true);
    };

    useEffect(() => {
        fetch('https://api.twitch.tv/helix/games/top?first=72', {
            mode: "cors", method: "GET", headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
            }
        })  
            .then(resOne => resOne.json())
            .then(resOne => {
                resOne.data.forEach((game) => {
                    setTopGames(
                        topGames => [...topGames, {
                            name: game.name,
                            gameImage: game.box_art_url.replace("{width}x{height}", "171x228")
                        }]
                    )
                })

                fetch('https://api.twitch.tv/helix/streams?first=100',{
                    mode: "cors", method: "GET", headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                    }
                })
                    .then(resTwo=>resTwo.json())
                    .then(resTwo=>{
                        const streamsUrl = resTwo.data.reduce((previousValue, currentValue) => 
                             previousValue + `login=${currentValue.user_login}&`,
                            '?'
                        )     

                        fetch(`https://api.twitch.tv/helix/users${streamsUrl}`,{
                            mode: "cors", method: "GET", headers: {
                                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                            }
                        })
                            .then(resThree => resThree.json())
                            .then(resThree => {
                                    resTwo.data.forEach((streamer) => {
                                        for(let i =0; i<resThree.data.length ; i++)  {
                                            
                                                if(resThree.data[i].login === streamer.user_login){
                                                    
                                                    setTopStreams(
                                                        topStreams => [...topStreams, {
                                                            login: streamer.user_login,
                                                            name: streamer.user_name, 
                                                            title: streamer.title,
                                                            viewers: streamer.viewer_count,
                                                            game: streamer.game_name,
                                                            thumbnail: streamer.thumbnail_url.replace("{width}x{height}", "293x165"),
                                                            profileImg: resThree.data[i].profile_image_url
                                                        }]
                                                    )
                                                    break;
                                                }
                                        }   
                                    })
                            })
                            .catch(err => console.error(err));         
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));

    }, [])

    return(
        <div className="directoryContainer">
            <h1 className="browseHeader">Browse</h1>
            <div className="categoriesHeaders">
                <div className="sectionsContainer">
                    Games
                </div>
                <div className="sectionsContainer">
                    IRL
                </div>
                <div className="sectionsContainer">
                    Music
                </div>
                <div className="sectionsContainer">
                    Esports
                </div>
                <div className="sectionsContainer">
                    Creative
                </div>
            </div>
            <div className="categoriesLiveChannels">
                {!categories ? 
                <p className="categoriesPara" onClick={clickedCategories}>Categories</p>
                : 
                <p className="categoriesParaActive" onClick={clickedCategories}>Categories</p>
                }
                {!liveChannels ?
                <p className="liveChannelsPara" onClick={clickedLiveChannels}>Live Channels</p>
                :
                <p className="liveChannelsParaActive" onClick={clickedLiveChannels}>Live Channels</p>
                }
            </div>
            {categories ?
            <div className="directoryMainContentCategories">
                {topGames.map((game) => {
                    return <div className="gameContainer">
                        <Link to = {`/directory/game/${game.name}`}><div class="gameImageHolder"><img className="gameDirectoryImage" src={game.gameImage}></img></div></Link>
                        <Link to = {`/directory/game/${game.name}`}><div className="directoryGameName">{game.name}</div></Link>
                    </div>
                })}
            </div>
            :
            <div className="directoryMainContentChannels">
                {topStreams.map((streamer) => {
                    return <div className="streamerContainer">
                            <div class="streamerImageHolder"><Link to = {`/${streamer.login}`}>
                            
                            <div className="thumbnailLive">LIVE</div>
                            <img className="streamerDirectoryImage" src={streamer.thumbnail}></img>
                            <div className="thumbnailCurrentViewers">{parseFloat((streamer.viewers/1000)).toFixed(1)}k viewers</div>
                            </Link>
                            
                        </div>
                        <div className="streamerImgAndTitleAndGame">
                            <div className="streamerImgAndTitleAndGameLeft">
                            <Link to = {`/${streamer.login}`}><img className="streamerImgAndTitleAndGameLeftImg" src={streamer.profileImg}></img></Link>
                            </div>
                            <div className="streamerImgAndTitleAndGameRight">
                            <Link to = {`/${streamer.login}`}><div className="streamerImgAndTitleAndGameRightTitle">{streamer.title}</div></Link>
                            <Link to = {`/${streamer.login}`}><div className="streamerImgAndTitleAndGameRightName">{streamer.name}</div></Link>
                                <div className="streamerImgAndTitleAndGameRightGame">{streamer.game}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
            }
        </div>
    )
};

export default Directory;