import React from 'react';
import { Container } from 'rsuite';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderComp from "./components/HeaderComp/Header"
import HomePageComp from "./components/HomePageComp/HomePage"
import LogInComp from "./components/LogInComp/LogIn"
import './App.css';

function App() {
    return (
        <Router>
            <Container className="main-container">

                <HeaderComp />

                <Switch>
                    
                    <Route path="/login">
                        <LogInComp />
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
