import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./streamer.scss"

const Streamer = () => {

    const {streamer} = useParams();
    const [ hideChat, setHideChat ] = useState(true);
    const [ streamerInfo, setStreamerInfo ] = useState([]);
    const [ timerCount, setTimerCount ] = useState('');

    const toggleChat = () => {
        setHideChat(!hideChat);
    };

    const timer = (streamerTime) => {
        let d1 = new Date(streamerTime);
        let d2 = new Date();
        let diff = (( d2.getTime() ) - ( d1.getTime() )) / 1000
        let result = new Date(diff * 1000).toISOString().substr(11,8)
        return result;
    };

    useEffect(() => {
        fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, 
        {mode: "cors", method: "GET", headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
            "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
        }})
            .then(res => res.json())
            .then(resOne => {
                fetch(`https://api.twitch.tv/helix/streams?user_login=${streamer}`, {
                    mode: "cors", method: "GET", headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                    }
                })  
                    .then(res => res.json())
                    .then(resTwo => {
                        fetch(`https://api.twitch.tv/helix/users/follows?to_id=${resOne.data[0].id}&first=1`,
                        {
                            mode: "cors", method: "GET", headers: {
                                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                            }
                        })
                            .then(res => res.json())
                            .then(resThree => {
                                setTimerCount(timer(resTwo.data[0].started_at))
                                setStreamerInfo( 
                                    {
                                        name: resOne.data[0].display_name,
                                        description: resOne.data[0].description,
                                        userImage: resOne.data[0].profile_image_url,
                                        checkmark: resOne.data[0].broadcaster_type,
                                        viewerCount: (resTwo.data[0].viewer_count).toLocaleString(),
                                        tags: resTwo.data[0].tag_ids,
                                        title: resTwo.data[0].title,
                                        game: resTwo.data[0].game_name,
                                        timeStarted: resTwo.data[0].started_at,
                                        followers: resThree.total
                                    }
                                )
                                console.log(resThree)
                            }
                            )
                            .catch(err => console.error(err));
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
           
    }, [streamer])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimerCount(timer(streamerInfo.timeStarted))
        }, 1000)
        return() => clearInterval(interval)
    }, [timerCount]);
    
    return(
       <div className="twitchContainer">
            <div class="twitchPlayerContainer">
                <iframe id = "ifr" className="twitchPlayer"
                    src= {`https://player.twitch.tv/?channel=${streamer}&parent=localhost`}
                    height="400px"
                    width="100%"
                    allowfullscreen="true">
                </iframe>
                {!hideChat ?
                <img onClick={toggleChat} className="hideChatIcon"
                        src={require('../../icons/doubleLeft.png')} title="show chat">
                </img>
                :
                <img onClick={toggleChat} className="hideChatIconShown"
                    src={require('../../icons/doubleLeft.png')} title="hide chat">
                </img>}

                <div className="belowTwitchPlayer">
                    <div className="streamerInfo">
                        <div className="leftSideStreamerInfo">
                            <div className="profileAndLive">
                                <img className="profileAndLiveImage" src={`${streamerInfo.userImage}`} ></img>
                                <div class="isLiveStreamer">LIVE</div>
                            </div>
                            <div className="nameTitleGame">
                                <div className="streamerNameCheckmark">
                                    <div className="streamerNameNextToCheck" style={{fontSize: "large"}}><a href="#">{streamerInfo.name}</a></div>
                                    {streamerInfo.checkmark === "partner" &&
                                    <img style={{width: "16px", height:"16px"}} src={require('../../icons/verifiedOne.png')}></img>
                                    }
                                </div>
                                <div class="streamerTitleGame">
                                    <div>{streamerInfo.title}</div>
                                    <div><a className="streamerGameName" href = "#">{streamerInfo.game}</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="rightSideStreamerInfo">
                            <div className="followSubscribe">
                                <div className="followBtn">
                                    <img className="heartIcon" src={require('../../icons/heart.png')}></img>
                                    <div>Follow</div>
                                </div>
                                <div className="subscribeBtn">
                                <img className="starIcon" src={require('../../icons/star.png')}></img>
                                    <div>Subscribe</div>
                                </div>
                            </div>
                            <div className="viewCountPlusTimerPlusButtons">
                                <div className="viewCountPlusImage">
                                    <img style={{width: "25px", height: "25px"}} src={require('../../icons/profileIconRed.png')}></img>
                                    <div style={{color: "#ff7573"}}>{streamerInfo.viewerCount}</div>
                                </div>
                                <div className="timerCount">{timerCount}</div>
                                <div class="sharePlusMore">
                                    <img style={{width: "20px" , height: "20px"}} src={require('../../icons/shareIcon.png')} title="share"></img>
                                    <img src={require('../../icons/verticalDots2.png')} title="more"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                          
                {hideChat &&
                <iframe id = "ifrChat" className="chatPlayer" src={`https://www.twitch.tv/embed/${streamer}/chat?darkpopout&parent=localhost`}
                    
                    width="700px"
                    >
                </iframe>
                }
        </div>
    )
};
export default Streamer;