import React, { useState } from 'react';
import { Content, InputGroup, Icon, Button, Input, Alert } from 'rsuite';
import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import Cookies from 'js-cookie';
import './LogIn.css'

function LogInComp({ setinput_P, setinput_E, input_P, input_E, setisLoggedIn, ...props }) {

    const [loading, setloading] = useState(false)
    const history = useHistory();

    const SignInUser = async() => {
        setloading(true)

        var response = await fetch('User', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: input_E,
                password: input_P
            })
        })
        .catch(error => {
            console.log("Error = ", error)
        })

        var result = await response.json()
        setloading(false)

        if (result.returnVal === 1) {

            props.SaveLoggedInUser(input_E)

            SetSignInCookie(result)
 
            Alert.success("خوش آمدید")

            setisLoggedIn(true)
            setTimeout(() => {
                history.push("/")
            }, 2000)

        } else if (result.returnMSG === "Wrong Pass") {
            Alert.error("پسورد اشتباه است")
        } else if (result.returnMSG === "Wrong Email") {
            Alert.error("ایمیل اشتباه است")
        }
        console.log("RES = ", result)

    }

    const SetSignInCookie = (res) => {

        const CheckForCookies = () => {
            var init_Cookie = Cookies.get("InitCookie")

            if (init_Cookie !== undefined) {

                var init_C_val = JSON.parse(init_Cookie)

                return init_C_val.SL
            } else {
                return []
            }
        }

        var cookieVal = JSON.stringify({
            ID: res.cookieID,
            UserEmail: input_E,
            Type: "SignIn",
            SL: CheckForCookies()
        })

        var inOneMinute = new Date(new Date().getTime() + 1 * 60 * 1000)

        Cookies.set("signedInCookie", cookieVal, { expires: inOneMinute, secure: true }) //could add domain
        Cookies.remove("InitCookie")
    }

    const HandleEmailChange = (value) => {
        setinput_E(value)
    }

    const HandlePassChange = (value) => {
        setinput_P(value)
    }

    const TESTT = () => {

        fetch('user', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then(result => console.log(" GET RES = ", result))
    }

    return (
        <Content className="login-content">
            <div className="login-sec">
                <div className="signin-logo-div">
                    <img
                        src="/logo.png"
                        alt="امیر شاهان"
                        height="150"
                        width="180"
                    />
                </div>

                <div className="inp-sec">
                    <div>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <Icon icon="ImUser" />
                            </InputGroup.Addon>
                            <Input
                                className="signin-inp"
                                type="email"
                                value={input_E}
                                onChange={HandleEmailChange}
                                placeholder="ایمیل "
                                disabled={loading}
                            />
                        </InputGroup>
                    </div>

                    <div>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <Icon icon="RiLockPasswordFill" />
                            </InputGroup.Addon>
                            <Input
                                className="signin-inp"
                                type="password"
                                value={input_P}
                                onChange={HandlePassChange}
                                placeholder="پسورد "
                                disabled={loading}
                            />
                        </InputGroup>
                    </div>
                </div>

                <div className="action-sec">
                    <Button className="login-btn" onClick={SignInUser}>ورود</Button>
                    <a className="forgot-pass-text">رمز عبور را فراموش کردم</a>
                </div>

                <div className="link-to-signup-div">
                    <p> اگر عضو باشگاه نیستید، هم اکنون <a className="signup-link">ثبت نام</a> کنید</p>
                </div>
            </div>

            <Button onClick={TESTT}>NEW BTN</Button>
        </Content>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SaveLoggedInUser: (userEmail) => { dispatch({ type: "SaveLoggedInUser", payload: userEmail }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInComp);