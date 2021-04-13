import './App.css';
import React, { useEffect, useState } from 'react';
import { Container } from 'rsuite';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux'
import Cookies from 'js-cookie';
import HeaderComp from "./components/HeaderComp/Header"
import HomePageComp from "./components/HomePageComp/HomePage"
import LogInComp from "./components/LogInComp/LogIn"

function App({ ...props }) {

    const [input_E, setinput_E] = useState("")
    const [input_P, setinput_P] = useState("")
    const [isLoggedIn, setisLoggedIn] = useState(false)

    var inOneMinute = new Date(new Date().getTime() + 1 * 60 * 1000)

    useEffect(() => {  // TODO: save logged in user in redux & get rid of isLoggedIn

        var InitCookie = Cookies.get("InitCookie")
        var signedInCookie = Cookies.get("signedInCookie")

        if (signedInCookie !== undefined) {

            var SignInCookieVal = JSON.parse(signedInCookie)

            Cookies.remove("InitCookie")

            SetLogInStatus(SignInCookieVal)

        } else {

            var initCookieVal = JSON.stringify({
                ID: null,
                UserEmail: null,
                Type: "Init",
                SL: []
            })

            Cookies.set("InitCookie", initCookieVal, { expires: inOneMinute, secure: true })
        }
    }, [])

    useEffect(() => {

        var newCookieVal

        var cookieSL = props.shoppingList.map(item => {
            return (
                { ID: item.id, Quantity: item.quantity } 
            )
        })

        if (isLoggedIn === false) {

            newCookieVal = JSON.stringify({
                ID: null,
                UserEmail: null,
                Type: "Init",
                SL: cookieSL
            })

            Cookies.set("InitCookie", newCookieVal, { expires: inOneMinute, secure: true })
        } else {

            var signedInCookie = JSON.parse(Cookies.get("signedInCookie"))

            newCookieVal = JSON.stringify({
                ID: signedInCookie.ID,
                UserEmail: props.loggedInUser,
                Type: "SignIn",
                SL: cookieSL
            })

            Cookies.set("signedInCookie", newCookieVal, { expires: inOneMinute, secure: true })
        }

    }, [props.shoppingList])

    const SetLogInStatus = (SignInCookieVal) => {

        setisLoggedIn(true);
        props.SaveLoggedInUser(SignInCookieVal.UserEmail)
    }

    console.log("IsLoggedIn = ", isLoggedIn)
    console.log("loggedIn User = ", props.loggedInUser)
    return (
        <Router>
            <Container className="main-container">

                <HeaderComp setisLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn}/>

                <Switch>
                    
                    <Route path="/login">
                        <LogInComp input_E={input_E} setinput_E={setinput_E} input_P={input_P} setinput_P={setinput_P} setisLoggedIn={setisLoggedIn}/>
                    </Route>

                    <Route path="/">
                        <HomePageComp />
                    </Route>

                </Switch>

            </Container>
        </Router>
    )
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
        shoppingList: state.shoppingList,
        foodList: state.foodList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateStateUsingCookie: (foodsToUpdate) => { dispatch({ type: "UpdateState_UsingCookies", payload: foodsToUpdate }) },
        SaveLoggedInUser: (userEmail) => { dispatch({ type: "SaveLoggedInUser", payload: userEmail }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
