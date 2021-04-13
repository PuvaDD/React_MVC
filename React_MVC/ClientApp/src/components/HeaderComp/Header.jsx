import React from 'react';
import { Header, Button } from 'rsuite';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import './Header.css';

function HeaderComp({ setisLoggedIn, isLoggedIn, ...props }) {

    const history = useHistory();

    const LogIn = () => {
        history.push("/login")
    }

    const LogOut = async () => {

        var response = await fetch('user/LogOut', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: props.loggedInUser
            })
        })
        .catch(error => { console.log("error = ", error) })

        var result = await response.json();

        console.log("LogOut Res = ", result)

        if (result.returnVal === 1) {
            props.SaveLoggedInUser("")
            setisLoggedIn(false)
        }
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

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SaveLoggedInUser: (logedInUserVal) => { dispatch({ type: "SaveLoggedInUser", payload: logedInUserVal }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);