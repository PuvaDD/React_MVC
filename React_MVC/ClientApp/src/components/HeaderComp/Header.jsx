import React from 'react';
import { Header, Button } from 'rsuite';
import { useHistory } from "react-router-dom";
import './Header.css';

function HeaderComp({ isLoggedIn }) {

    const history = useHistory();

    const LogIn = () => {
        history.push("/login")
    }

    return (
        <Header className="header">
            <div className="header-div">

                {!isLoggedIn ? <> <Button className="signin-btn" size="lg" onClick={LogIn}>ورود / عضویت</Button> </> : null }

                <div style={isLoggedIn ? { display: "grid", placeContent: "end" } : null}>
                    <img
                        className="header-logo"
                        src="/logo.png"
                        alt="logo"
                    />
                </div>
            </div>
        </Header>
    )
}

export default HeaderComp;