import React from 'react';
import { Header, Button } from 'rsuite';
import { useHistory } from "react-router-dom";
import './Header.css';

function HeaderComp({ isLoggedIn }) {

    const history = useHistory();

    const LogIn = () => {
        history.push("/login")
    }

    const LogOut = () => {
        console.log("Logged Out")
        /*fetch('user', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({

            })
        })*/
    }

    return (
        <Header className="header">
            <div className="header-div">

                {!isLoggedIn ? <> <Button className="signin-btn" size="lg" onClick={LogIn}>ورود / عضویت</Button> </> : <Button className="signin-btn" size="lg" onClick={LogOut}>خروج</Button> }

                <div >
                    <img
                        className="header-logo"
                        src="/logo.png"
                        alt="logo"
                        onClick={() => history.push("/")}
                    />
                </div>
            </div>
        </Header>
    )
}

export default HeaderComp;