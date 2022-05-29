import "..//nav/nav.scss";
const Nav = () => {
    return(
        <nav className="navigation">
            <div className="left">
                <img alt="twitch icon" src={require("../../icons/navIcon3.png")} style = {{width:"32px", height: "32px"}}></img>
                <button className="browse">Browse</button>
                <img alt="more options" className="moreVert" title="more" src={require("../../icons/verticalDots2.png")} />
            </div>

            <div className="center">
                <input placeholder="Search" className="search"></input>    
                <img alt="search" className="searchBtn" src= {require("../../icons/searchIcon.png")} style = { {width: "25px", height: "25px"} }></img>
            </div>

            <div className="right">
                <img className="loot" title = "prime loot" alt = "prime loot" src={require("../../icons/primeLoot.png")}></img>
                <button className="logIn">Log In</button>
                <button className="signUp">Sign Up</button>
                <img className="profile" src={require("../../icons/profileIcon.png")} alt = "profile" />
            </div>
        </nav>
    )
};

export default Nav;