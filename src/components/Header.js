import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
const Header = () => {
    let btnName = "login";

    const [buttonName, setButtonName] = useState("Login");
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Cart</li>
                    {/* <button className="login-btn" onClick={()=>{
                        btnName = "logout";
                        console.log("btnName is ",btnName);
                        //it will not update in ui if we use js variable
                        //we ahve to use state variable
                    }}>{btnName}</button> */}

                    <button
                        className="login-btn"
                        onClick={() => {
                            buttonName === "Login"
                                ? setButtonName("Logout")
                                : setButtonName("Login");
                        }}
                    >
                        {buttonName}
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Header;
