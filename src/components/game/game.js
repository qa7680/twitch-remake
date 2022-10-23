import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./game.scss";

const Game = () => {

    const { name } = useParams();
    const [ game , setGame ] = useState([]);
    const [ liveChannelsContent, setliveChannelsContent ] = useState([]); 
    const [ videosContent, setVideosContent ] = useState([]);
    const [ clipsContent, setClipsContent ] = useState([]);
    const [ liveChannelsSection, setLiveChannelsSection ] = useState(true);
    const [ videos, setVideos ] = useState(false);
    const [ clips, setClips ] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalClip, setModalClip ] = useState('');

    const liveChannelsClicked = () => {
        setLiveChannelsSection(true);
        setVideos(false);
        setClips(false);
    };

    const videosClicked = () => {
        setVideos(true);
        setLiveChannelsSection(false);
        setClips(false);
    };

    const clipsClicked = () => {
        setClips(true);
        setLiveChannelsSection(false);
        setVideos(false);
    };

    const openModal = (clipUrl) => {
        setModalOpen(true);
        setModalClip(clipUrl);
    };

    const closeModal = () => {
        setModalOpen(false)
    };


    useEffect(() => {
        fetch(`https://api.twitch.tv/helix/games?name=${name}`,{
            mode: "cors", method: "GET", headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
            }
        })  
            .then(res => res.json())
            .then(res => {
                setGame({
                    name: res.data[0].name,
                    image: res.data[0].box_art_url.replace("{width}x{height}","144x192"),
                    id: res.data[0].id,
                })
                fetch(`https://api.twitch.tv/helix/streams?first=100&game_id=${res.data[0].id}`, {
                    mode: "cors", method: "GET", headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                    }  
                })  
                    .then(resTwo => resTwo.json())
                    .then(resTwo => {
                        const sumStrings = resTwo.data.reduce((previousValue, currentValue) => 
                        previousValue + `login=${currentValue.user_login}&`, "")
                        fetch(`https://api.twitch.tv/helix/users?${sumStrings}`, {
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
                                                
                                                setliveChannelsContent(
                                                    liveChannelsContent => [...liveChannelsContent, {
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
                                
                                fetch(`https://api.twitch.tv/helix/clips?game_id=${res.data[0].id}&first=100`, {
                                    
                                    mode: "cors", method: "GET", headers: {
                                        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                                        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                                    }
                                })
                                    .then(resFour=>resFour.json())
                                    .then(resFour=>{
                                        setClipsContent(resFour.data);
                                    })
                                    .catch(err=>console.error(err));
                        })
                            .catch(err => console.error(err));
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, []);
    
    return(
        <div className="dirGameContainer">
            <div className="dirGameContainerDescription">
                <div className="dirGameContainerDescriptionLeft">
                    <img src={game.image}></img>
                </div>
                <div className="dirGameContainerDescriptionRight">
                    <h1>{game.name}</h1>
                    <div className="dirGameContainerDescriptionRightFollowBtn">
                        <img className="heartIcon" src={require('../../icons/heart.png')}></img>
                        <div>Follow</div>
                    </div>
                </div>
                <div className="dirGameContainerSections"></div>
            </div>
            <div className="dirGameContainerSections">
                {liveChannelsSection ?
                <p className="liveChannelsSectionClicked" onClick={liveChannelsClicked}>Live Channels</p>
                :<p className="dirGameContainerSectionsNotClicked" onClick={liveChannelsClicked}>Live Channels</p>
                }
                
                {clips ?
                <p className="clipsSectionClicked" onClick={clipsClicked}>Clips</p>
                :<p className="dirGameContainerSectionsNotClicked" onClick={clipsClicked}>Clips</p>
                }
            </div>
            <div className="dirGameContainerSectionContent">
                {
                    liveChannelsSection &&
                    <div className="directoryMainContentChannels">
                {liveChannelsContent.map((streamer) => {
                    return <div className="streamerContainer">
                            <div class="streamerImageHolder"><Link to = {`/${streamer.login}`}>
                            
                            <div className="thumbnailLive">LIVE</div>
                            <img className="streamerDirectoryImage" src={streamer.thumbnail}></img>
                            {streamer.viewers >1000 ?
                            <div className="thumbnailCurrentViewers">
                                {parseFloat((streamer.viewers/1000)).toFixed(1)}k viewers
                            </div>
                            :
                            <div className="thumbnailCurrentViewers">
                                {streamer.viewers} viewers
                            </div>
                            }
                            </Link>
                            
                        </div>
                        <div className="streamerImgAndTitleAndGame">
                            <div className="streamerImgAndTitleAndGameLeft">
                            <Link to = {`/${streamer.login}`}><img className="streamerImgAndTitleAndGameLeftImg" src={streamer.profileImg}></img></Link>
                            </div>
                            <div className="streamerImgAndTitleAndGameRight">
                            <Link to = {`/${streamer.login}`}><div className="streamerImgAndTitleAndGameRightTitle">{streamer.title}</div></Link>
                            <Link to = {`/${streamer.login}`}><div className="streamerImgAndTitleAndGameRightName">{streamer.name}</div></Link>
                            <Link to = {`/directory/game/${streamer.game}`}><div className="streamerImgAndTitleAndGameRightGame">{streamer.game}</div></Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>
                }
                
                {
                    clips && 
                    <div className="directoryMainContentChannelsClips">
                {clipsContent.map((clip) => {
                    return <div className="streamerContainer">
                            <div class="streamerImageHolder">
                            
                            {clip.duration === 60 ? 
                            <div className="clipTime">
                                1:00
                            </div>
                            :
                            <div className="clipTime">
                                0:{Math.floor(clip.duration)}
                            </div>
                            }
                            <img onClick={() => openModal(clip.id)} style={{width: "293px", height: "165px"}} className="streamerDirectoryImage" src={clip.thumbnail_url}></img>
                            <div className="viewersAndTime">
                                {
                                    clip.view_count>1000000 ?
                                    <div className="thumbnailCurrentViewers">
                                        {parseFloat((clip.view_count/1000000)).toFixed(1)}M viewers
                                    </div>
                                :
                                clip.view_count >1000 ?
                                <div className="thumbnailCurrentViewers">
                                    {parseFloat((clip.view_count/1000)).toFixed(1)}k viewers
                                </div>
                                :
                                <div className="thumbnailCurrentViewers">
                                    {clip.view_count} viewers
                                </div>
                                }
                                { (new Date().getFullYear() - parseInt(clip.created_at.slice(0,4)) === 1 ) ?
                                <div className="clipDate">
                                    Last year
                                </div>
                                :
                                (new Date().getFullYear() - parseInt(clip.created_at.slice(0,4)) === 0 ) ?
                                <div className="clipDate">
                                    This year
                                </div>
                                
                                :
                                <div className="clipDate">
                                    {new Date().getFullYear() - parseInt(clip.created_at.slice(0,4))} years ago
                                </div>
                                }
                            </div>
                            
                            
                        </div>
                        <div className="streamerImgAndTitleAndGame">
                            <div className="streamerImgAndTitleAndGameRight">
                               <div onClick={() => openModal(clip.id)} className="streamerImgAndTitleAndGameRightTitle">{clip.title}</div>
                                <Link to = {`/${clip.broadcaster_name}`}><div className="streamerImgAndTitleAndGameRightName">{clip.broadcaster_name}</div></Link>
                                <Link to = {`/${clip.creator_name}`}><div className="streamerImgAndTitleAndGameRightGame">Cliped by {clip.creator_name}</div></Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>
                
                }
                <div>
                        {modalOpen &&
                            <div className="clipModalContainer">
                                <div className="modalClipVideo">
                                <iframe className="clipFrameVideo"
                                    src={`https://clips.twitch.tv/embed?clip=${modalClip}&parent=qa7680-twitch-clone.netlify.app`}
                                    height="300px"
                                    width="300px"
                                    allowfullscreen="true">
                                </iframe>
                                </div>
                                <div onClick={closeModal} className="closeModalButton">x</div>
                            </div>
                        }
                        </div>
            </div>
        </div>
    )
};

export default Game;