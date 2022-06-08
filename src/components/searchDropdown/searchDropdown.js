import "../nav/nav.scss"
import "..//searchDropdown/searchDropdown.scss"
import React, {forwardRef} from 'react';
import { Link } from "react-router-dom";

const SearchDropdown = ({ searchArray }, ref) => {
    return(
        <div ref={ref} className="search-dropdown">
            {searchArray.map(item => {
                if(item.is_live === true){
                    return <Link to ={ `${item.broadcaster_login}` } className="streamerLink"><div className="searchItems">
                                <div class="leftside">
                                    <div class="searchImgContainer">
                                        <img src= {item.thumbnail_url} style={{width: "30px", height: "30px"}}
                                        className="channelPhoto"/>
                                    </div>
                                    <div class="itemName">{item.display_name}</div>
                                </div>
                                <div class="isLive">LIVE</div>
                            </div>
                            </Link>
                }else{
                    return <Link to ={ `${item.broadcaster_login}` } className="streamerLink"><div class="searchItems">   
                                <div class="leftside">
                                    <div class="searchImgContainer">
                                        <img alt="search" src= {require("../../icons/searchIcon.png")} style = { {width: "20px", height: "20px" } }></img>
                                    </div>
                                    <div class="itemName">{item.display_name}</div>
                                </div>  
                            </div>
                            </Link>
                }
            })}
        </div>
    )
};

export default forwardRef(SearchDropdown);