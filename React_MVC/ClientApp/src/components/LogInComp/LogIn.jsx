import React, { useState } from 'react';
import { Content, InputGroup, Icon, Button, Input } from 'rsuite';
import { Link } from "react-router-dom";
import './LogIn.css'

function LogInComp() {

    const [loading, setloading] = useState(false)
    const [input_E, setinput_E] = useState("")
    const [input_P, setinput_P] = useState("")

/*    const SignInUser = () => {
        fetch('User', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                Email: input_E,
                Password: input_P
            })
        })
        .then(response => { return response.json() })
        .then((result) => {
            console.log("sign in res = ", result)
        })
    }*/

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
                    <Button className="login-btn">ورود</Button>
                    <Link className="forgot-pass-text">رمز عبور را فراموش کردم</Link>
                </div>

                <div className="link-to-signup-div">
                    <p> اگر عضو باشگاه نیستید، هم اکنون <Link className="signup-link">ثبت نام</Link> کنید</p>
                </div>
            </div>
        </Content>
    )
}

export default LogInComp;