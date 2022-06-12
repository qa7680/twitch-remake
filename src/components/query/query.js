import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './query.scss';

const Query = () => {

    const {queryValue} = useParams();
    const [ queryChannels, setQueryChannels ] = useState([]);
    const [ queryCategories, setQueryCategories ] = useState([]);

    useEffect(() => {
        fetch(`https://api.twitch.tv/helix/search/channels?query=${queryValue}&first=5&live_only=true`, {
            mode: "cors", method: "GET", headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
            }
        })
            .then(res => res.json())
            .then(res=>{
                fetch(`https://api.twitch.tv/helix/search/categories?query=${queryValue}&first=5`, {
                    mode: "cors", method: "GET", headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                    }
                })
                    .then(resTwo=>resTwo.json())
                    .then(resTwo=>{
                        setQueryCategories(resTwo.data)
                        const urlTotal = res.data.reduce((previousValue, currentValue) => 
                            previousValue + `user_id=${currentValue.id}&`,
                            "?"
                        )
                        fetch(`https://api.twitch.tv/helix/streams${urlTotal}`,{
                            mode: "cors", method: "GET", headers: {
                                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
                                "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
                            }
                        })
                            .then(resThree=>resThree.json())
                            .then(resThree=>setQueryChannels(resThree.data))
                            .catch(err=>console.error(err));
                    })
                    .catch(err=>console.log(err));
            })
            .catch(err=>console.error(err));
    }, [queryValue])

    
    console.log(queryChannels);

    return(
        <div className="queryContainer">
            <div class="queryContainerInside">
                {queryChannels.length>0 &&
                <div className="queryChannelsSection">
                    <div className="queryChannelsTitle">Live Channels</div>
                    
                    {queryChannels.map((queryItem) => {
                        return <div className="queryItemContainer">
                            <div className="queryItemLeftSide">
                                <div className="queryLiveText">LIVE</div>
                                <Link to = {`/${queryItem.user_login}`}><img className="queryItemThumbnail" src={queryItem.thumbnail_url.replace("{width}x{height}", "214x120")}></img></Link>
                            </div>
                            <div className="queryItemRightSide">
                                <div className="queryItemUserName">
                                <Link to = {`/${queryItem.user_login}`}>{queryItem.user_name}</Link>
                                </div>
                                <div className="queryItemRightSideGame">
                                    <Link to = {`/directory/game/${queryItem.game_name}`}>{queryItem.game_name}</Link>
                                </div>
                                {queryItem.viewer_count > 1000 ? 
                                <div className="queryItemViewerCount">
                                    { (queryItem.viewer_count/1000).toFixed(1) }k viewers
                                </div>
                                :
                                queryItem.viewer_count === 1 ?
                                <div className="queryItemViewerCount">
                                    1 viewer
                                </div>
                                
                                :
                                <div className="queryItemViewerCount">
                                    { queryItem.viewer_count} viewers
                                </div>
                                }
                                
                                <div className="queryItemTitle">
                                    {queryItem.title}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                }
                {queryCategories.length>0 &&
                <div className="queryCategoriesSection">                  
                    <div className="queryCategoriesTitle">Categories</div>
                    {queryCategories.map((categoryItem) => {
                        return <div className= "categoryItem">
                            <div className="categoryItemLeft">
                                <Link to = {`/directory/game/${categoryItem.name}`}>
                                    <img className="categoriesImage" src={`${categoryItem.box_art_url.replace("{width}x{height}", "100x100")}`}></img>
                                </Link>
                            </div>
                            <div className="categoryItemRight">
                                <Link to = {`/directory/game/${categoryItem.name}`}>
                                    <div className="categoryName">{categoryItem.name}</div>
                                </Link>
                            </div>
                        </div>
                    })}
                </div>
                }
            </div>
        </div>
    )
};

export default Query;