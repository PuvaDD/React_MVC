import React, { useEffect, useState } from 'react';
import { Container } from 'rsuite';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import HeaderComp from "./components/HeaderComp/Header"
import HomePageComp from "./components/HomePageComp/HomePage"
import LogInComp from "./components/LogInComp/LogIn"
import './App.css';

function App() {

    const [isLoggedIn, setisLoggedIn] = useState(false)
    var validCookie = Cookies.get("signedInCookie")

    useEffect(() => {
        CheckLogInStatus()
    }, [validCookie])

    const CheckLogInStatus = () => {
        var validCookie = Cookies.get("signedInCookie")
        console.log("VALID COOKIE = ", validCookie)

        if (validCookie != undefined) {
            setisLoggedIn(true);
        }
    }

    console.log("Cookie = ", Cookies.get("signedInCookie"))
    console.log("IsLoggedIn = ", isLoggedIn)
    return (
        <Router>
            <Container className="main-container">

                <HeaderComp isLoggedIn={isLoggedIn}/>

                <Switch>
                    
                    <Route path="/login">
                        <LogInComp setisLoggedIn={setisLoggedIn}/>
                    </Route>

                    <Route path="/">
                        <HomePageComp />
                    </Route>

                </Switch>

            </Container>
        </Router>
    )
}

export default App;
