import "../nav/nav.scss"
import "..//searchDropdown/searchDropdown.scss"
import React, {forwardRef} from 'react';

const SearchDropdown = ({ searchArray }, ref) => {
    
    return(
        <div ref={ref} className="search-dropdown">
            {searchArray.map(item => {
                if(item.is_live === true){
                    return <div onClick={ () => console.log(item) } className="searchItems">
                                <div class="leftside">
                                    <div class="searchImgContainer">
                                        <img src= {item.thumbnail_url} style={{width: "30px", height: "30px"}}
                                        className="channelPhoto"/>
                                    </div>
                                    <div class="itemName">{item.display_name}</div>
                                </div>
                                <div class="isLive">LIVE</div>
                            </div>
                }else{
                    return <div onClick={() => console.log(item)} class="searchItems">   
                                <div class="leftside">
                                    <div class="searchImgContainer">
                                        <img alt="search" src= {require("../../icons/searchIcon.png")} style = { {width: "20px", height: "20px" } }></img>
                                    </div>
                                    <div class="itemName">{item.display_name}</div>
                                </div>
                                
                            </div>
                }
            })}
        </div>
    )
};

export default forwardRef(SearchDropdown);