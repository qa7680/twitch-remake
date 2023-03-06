import "..//nav/nav.scss";
import React, { useState, useEffect, useRef } from "react";
import  "../searchDropdown/searchDropdown";
import SearchDropdown from "../searchDropdown/searchDropdown";
import { useNavigate,Link } from "react-router-dom"; 

const Nav = () => {

    const [ moreToggled, setMoreToggled ] = useState(false);
    const [ primeToggled, setPrimeToggled ] = useState(false);
    const [ profileToggled, setProfileToggled ] = useState(false);
    const [ inputValue, setInputValue ] = useState('');
    const [ searchArray, setSearchArray ] = useState([]);
    const [ inputClicked, setInputClicked ] = useState(false);
    const moreNode = useRef();
    const moreContent = useRef();
    const primeNode = useRef();
    const primeText = useRef();
    const profileNode = useRef();
    const profileContent = useRef();
    const searchContent = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();

    const hideMore = () => {
        setMoreToggled(!moreToggled);
    };

    const outsideMore = (e) => {
        if(moreNode.current?.contains(e.target) ||
            moreContent.current?.contains(e.target)){
                return;
            }else{
                setMoreToggled(false);
            }
    };

    let clickIframe = window.setInterval(checkFocus, 100);
    
    function checkFocus() {
      if(document.activeElement == document.getElementById("ifr")) {
          setMoreToggled(false);
          setPrimeToggled(false);
          setProfileToggled(false);
          setInputClicked(false);
          window.focus();
       }else if (document.activeElement === document.getElementById("ifrChat")){
            setPrimeToggled(false);
            setProfileToggled(false);
            setMoreToggled(false);
            setInputClicked(false);
            window.focus();
       }
    }


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
    };
    
    const inputFalse = () => {
        setInputClicked(false);
        setInputValue('');
    }
    
    const outsideSearch = (e) => {
        if(inputRef.current?.contains(e.target)){
            return;
        }else if(searchContent.current?.contains(e.target)){
            setTimeout(inputFalse, 150);
        }
        else{
            setInputClicked(false);
        }
    };

    const onInputClicked = () => {
        setInputClicked(true);
    };

    //handles input change
    const onInputChange = (e) => {
        setInputValue(e.target.value);
    };

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

    useEffect(() => {
        document.addEventListener('mousedown', outsideSearch)

        //cleanup
        return() => {
            document.removeEventListener('mousedown', outsideSearch)
        }
    },[inputValue])

    useEffect(() => {
        if(inputValue.length>0){
        fetch(`https://api.twitch.tv/helix/search/channels?query=${inputValue}&first=7`, 
        {mode: "cors", method: "GET", 
        headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_KEY}`,
        "Client-Id": `${process.env.REACT_APP_CLIENT_ID}`
        }})
            .then(res => {return res.json()})
            .then(res => setSearchArray(res.data))
            .catch(err => console.error(err));
    }else{
        setSearchArray([]);   
    }
    }, [inputValue]);

    return(
            <nav className="navigation">
                <div className="left">
                    <Link to = "/">
                    <img className="twitchIcon" alt="twitch icon" src={require("../../icons/navIcon3.png")} style = {{width:"32px", height: "32px"}}></img>
                    </Link>
                    <Link className="linkBrowse" to = "/directory">
                    <button className="browse">Browse</button>
                    </Link>
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
                    <p className="lightTwitch">Light Twitch</p>
                </div>
                
                <div className="dropdownSearch">
                    <div className="center">
                        <input onKeyDown={(e) => {
                            if(e.key === "Enter" && inputValue.length>0){
                                navigate(`/search/${inputValue}`);
                                setInputClicked(false);
                            }
                        }} ref={inputRef} onClick={onInputClicked} onChange={onInputChange} placeholder="Search" className="search" value={inputValue} maxLength = "30"></input>
                        <img onClick={(e) =>{
                            if(inputValue.length>0){
                            navigate(`/search/${inputValue}`)
                            }
                        }} alt="search" className="searchBtn" src= {require("../../icons/searchIcon.png")} style = { {width: "25px", height: "25px"} }></img>
                    </div>
                {inputClicked ?
                <SearchDropdown searchArray={searchArray} ref = {searchContent}/>
                : null}
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