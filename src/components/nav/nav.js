import "..//nav/nav.scss";
import React, { useState } from "react";
const Nav =() => {

    const [ moreToggled, setMoreToggled ] = useState(false);
    const [ primeToggled, setPrimeToggled ] = useState(false);
    const [ profileToggled, setProfileToggled] = useState(false);

    const moreClicked = () => {
        setMoreToggled(true);
    };
    const primeClicked = () => {
        setPrimeToggled(true);
    };
    const profileClicked = () => {
        setProfileToggled(true);
    }

    const bodyClicked = () => {
        if(moreToggled){
            setMoreToggled(false);
        }
        if(primeToggled){
            setPrimeToggled(false);
        }
        if(profileToggled){
            setProfileToggled(false);
        }
    };

    return(
        <body onClick={bodyClicked}>
            <nav className="navigation">
                <div className="left">
                    <img alt="twitch icon" src={require("../../icons/navIcon3.png")} style = {{width:"32px", height: "32px"}}></img>
                    <button className="browse">Browse</button>
                    <div className="dropdown">
                        <img onClick={moreClicked} alt="more options" className="moreVert" title="more" src={require("../../icons/verticalDots2.png")} />
                        { moreToggled ?
                        <div className="dropdown-content">
                            <div className="general">
                                <p>GENERAL</p>
                                <a href = "#">About</a>
                                <a href = "#">Advertisers</a>
                                <a href = "#">Blog</a>
                                <a href = "#">Developers</a>
                                <a href = "#">Download Apps</a>
                                <a href = "#">Gift Card</a>
                                <a href = "#">IGDB</a>
                                <a href = "#">Jobs</a>
                                <a href = "#">Loot Cave-Merch Store</a>
                                <a href = "#">Music on Twitch</a>
                                <a href = "#">Partners</a>
                                <a href = "#">Press</a>
                                <a href = "#">Turbo</a>
                            </div>
                            <div className="help">
                                <p>HELP & LEGAL</p>
                                <a href = "#">Accessibility Statement</a>
                                <a href = "#">Ad Choices</a>
                                <a href = "#">Community Guidelines</a>
                                <a href = "#">Cookie Policy</a>
                                <a href = "#">Help</a>
                                <a href = "#">Privacy Policy</a>
                                <a href = "#">Safety Center</a>
                                <a href = "#">Security</a>
                                <a href = "#">Terms</a>
                            </div>
                        </div>
                        : null}
                    </div>
                </div>
                <div className="center">
                    <input placeholder="Search" className="search"></input>
                    <img alt="search" className="searchBtn" src= {require("../../icons/searchIcon.png")} style = { {width: "25px", height: "25px"} }></img>
                </div>
                <div className="right">
                    <div className="dropdown">
                        <img onClick={primeClicked} className="loot" title = "prime loot" alt = "prime loot" src={require("../../icons/primeLoot.png")}></img>
                        {primeToggled ?
                        <div class="loot-dropdown">
                            <p>Prime Gaming Loot</p>
                    
                        </div>
                        : null }
                    </div>
                    <button className="logIn">Log In</button>
                    <button className="signUp">Sign Up</button>
                    <div class="dropdown">
                        <img onClick={profileClicked} className="profile" src={require("../../icons/profileIcon.png")} alt = "profile" />
                        {profileToggled ?
                        <div className="profile-dropdown">
                            <div>
                                <p><img src={require('../../icons/languageIcon.png')}></img> Language</p>                        
                                <p style={{fontSize: "larger"}}>{`>`}</p>
                            </div>
                            <div>
                                <p><img src={require('../../icons/themeIcon.png')}
                                style = {{transform: "rotate(-45deg)"}}></img> Dark Theme</p>                        
                                <p>{`<`}</p>
                            </div>
                            <div>
                                <p><img src={require('../../icons/loginIcon.png')} /> Log In</p>                                  
                            </div>
                        </div>
                        : null}
                    </div>
                </div>
            </nav>
        </body>
    )
};

export default Nav;