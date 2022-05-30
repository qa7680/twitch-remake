import "..//nav/nav.scss";
import React, { useState, useEffect, useRef } from "react";
const Nav =() => {

    const [ moreToggled, setMoreToggled ] = useState(false);
    const [ primeToggled, setPrimeToggled ] = useState(false);
    const [ profileToggled, setProfileToggled] = useState(false);
    const moreNode = useRef();
    const moreContent = useRef();
    const primeNode = useRef();
    const primeText = useRef();
    const profileNode = useRef();
    const profileContent = useRef();

    const hideMore = () => {
        setMoreToggled(!moreToggled);
    }

    const outsideMore = (e) => {
        if(moreNode.current?.contains(e.target) ||
            moreContent.current?.contains(e.target)){
                return;
            }else{
                setMoreToggled(false);
            }
    };

    const outsidePrime = (e) => {
        if(primeNode.current?.contains(e.target) ||
        primeText.current?.contains(e.target)){
            return;
        }else{
            setPrimeToggled(false);
        }
    };

    const outsideProfile = (e) => {
        if(profileNode.current?.contains(e.target) ||
        profileContent.current?.contains(e.target)){
            return;
        }else{
            setProfileToggled(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', outsideMore)

        //cleanup
        return() => {
            document.removeEventListener('mousedown', outsideMore)
        }
    }, [moreToggled])

    useEffect(() => {
        document.addEventListener('mousedown', outsidePrime)

        //cleanup
        return() => {
            document.removeEventListener('mousedown', outsidePrime)
        }
    }, [primeToggled])

    useEffect(() => {
        document.addEventListener('mousedown', outsideProfile)

        //cleanup
        return() => {
            document.removeEventListener('mousedown', outsideProfile)
        }
    }, [profileToggled])


    return(
            <nav className="navigation">
                <div className="left">
                    <img alt="twitch icon" src={require("../../icons/navIcon3.png")} style = {{width:"32px", height: "32px"}}></img>
                    <button className="browse">Browse</button>
                    <div className="dropdown">
                        <img onClick={hideMore} ref={moreNode} alt="more options" className="moreVert" title="more" src={require("../../icons/verticalDots2.png")} />
                        { moreToggled &&
                        <div ref={moreContent} className="dropdown-content">
                            <div className="general">
                                <p>GENERAL</p>
                                <a onClick={hideMore} href = "#">About</a>
                                <a onClick={hideMore} href = "#">Advertisers</a>
                                <a onClick={hideMore} href = "#">Blog</a>
                                <a onClick={hideMore} href = "#">Developers</a>
                                <a onClick={hideMore} href = "#">Download Apps</a>
                                <a onClick={hideMore} href = "#">Gift Card</a>
                                <a onClick={hideMore} href = "#">IGDB</a>
                                <a onClick={hideMore} href = "#">Jobs</a>
                                <a onClick={hideMore} href = "#">Loot Cave-Merch Store</a>
                                <a onClick={hideMore} href = "#">Music on Twitch</a>
                                <a onClick={hideMore} href = "#">Partners</a>
                                <a onClick={hideMore} href = "#">Press</a>
                                <a onClick={hideMore} href = "#">Turbo</a>
                            </div>
                            <div className="help">
                                <p>HELP & LEGAL</p>
                                <a onClick={hideMore} href = "#">Accessibility Statement</a>
                                <a onClick={hideMore} href = "#">Ad Choices</a>
                                <a onClick={hideMore} href = "#">Community Guidelines</a>
                                <a onClick={hideMore} href = "#">Cookie Policy</a>
                                <a onClick={hideMore} href = "#">Help</a>
                                <a onClick={hideMore} href = "#">Privacy Policy</a>
                                <a onClick={hideMore} href = "#">Safety Center</a>
                                <a onClick={hideMore} href = "#">Security</a>
                                <a onClick={hideMore} href = "#">Terms</a>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="center">
                    <input placeholder="Search" className="search"></input>
                    <img alt="search" className="searchBtn" src= {require("../../icons/searchIcon.png")} style = { {width: "25px", height: "25px"} }></img>
                </div>
                <div className="right">
                    <div className="dropdown">
                        <img onClick={() => setPrimeToggled(!primeToggled)} ref={primeNode} className="loot" title = "prime loot" alt = "prime loot" src={require("../../icons/primeLoot.png")}></img>
                        {primeToggled &&
                        <div ref={primeText} class="loot-dropdown">
                            <p>Prime Gaming Loot</p>
                    
                        </div>
                        }
                    </div>
                    <button className="logIn">Log In</button>
                    <button className="signUp">Sign Up</button>
                    <div class="dropdown">
                        <img onClick={() => { setProfileToggled(!profileToggled) }} ref={profileNode} className="profile" src={require("../../icons/profileIcon.png")} alt = "profile" />
                        {profileToggled &&
                        <div ref={profileContent} className="profile-dropdown">
                            <div>
                                <div>
                                    <img src={require('../../icons/languageIcon.png')}></img>
                                    <p>Language</p>
                                </div>                        
                                <img src={require('../../icons/arrowIcon.png')} style={ {width: "15px", height: "15px"} }/>
                            </div>
                            <div>
                                <div>
                                    <img src={require('../../icons/themeIcon.png')}
                                    style = {{transform: "rotate(-45deg)"}}></img>
                                    <p>Dark Theme</p>
                                </div>                       
                                
                            </div>
                            <div>
                                <div>
                                    <img src={require('../../icons/loginIcon.png')} />
                                    <p> Log In</p>
                                </div>                                  
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </nav>
    )
};

export default Nav;