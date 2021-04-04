import React, { useState } from 'react';
import { Content, InputGroup, Icon, Button, Input } from 'rsuite';
import { Link } from "react-router-dom";
import './LogIn.css'

function LogInComp() {

    const [loading, setloading] = useState(false)
    const [input_E, setinput_E] = useState("")
    const [input_P, setinput_P] = useState("")

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

        console.log("RES = ", result)

    }

    const HandleEmailChange = (value) => {
        setinput_E(value)
    }

    const HandlePassChange = (value) => {
        setinput_P(value)
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
        </Content>
    )
}

export default LogInComp;