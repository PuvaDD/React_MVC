import React from 'react';
import { Content } from 'rsuite'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./RestaurantInfo.css"

function RestaurantInfoComp() {

    return (
        <Content>
            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                <div className="resinfo-main-div">
                    <div className="top-div-resinfo">

                        <tbody className="availability-div">
                            <tr className="info-table">
                                <td>--</td>
                                <td>--</td>
                                <td style={{paddingRight: 0}}>08:00 تا 23:00</td>
                                <td className="weekday">شنبه</td>
                            </tr>
                            <tr className="info-table">
                                <td>--</td>
                                <td>--</td>
                                <td style={{paddingRight: 0}}>08:00 تا 23:00</td>
                                <td className="weekday">یکشنبه</td>
                            </tr>
                            <tr className="info-table">
                                <td>--</td>
                                <td>--</td>
                                <td style={{paddingRight: 0}}>09:00 تا 23:00</td>
                                <td className="weekday">دوشنبه</td>
                            </tr>
                            <tr className="info-table">
                                <td>--</td>
                                <td>--</td>
                                <td style={{paddingRight: 0}}>09:00 تا 23:00</td>
                                <td className="weekday">سه شنبه</td>
                            </tr>
                            <tr className="info-table">
                                <td>--</td>
                                <td>--</td>
                                <td style={{paddingLeftRight: 0}}>09:00 تا 23:00</td>
                                <td className="weekday">چهارشنبه</td>
                            </tr>
                            <tr className="info-table">
                                <td>--</td>
                                <td>--</td>
                                <td style={{paddingRight: 0}}>09:00 تا 23:00</td>
                                <td className="weekday">پنج شنبه</td>
                            </tr>
                            <tr className="info-table">
                                <td>--</td>
                                <td>--</td>
                                <td style={{paddingRight: 0}}>09:00 تا 23:00</td>
                                <td className="weekday">جمعه</td>
                            </tr>
                        </tbody>

                        <div className="info-div">
                            <p className="contact-info-p">: آدرس</p>
                            <p className="contact-info-p">مشهد - بین هفت تیر 3 و 5 , امیر شاهان</p>
                            <p className="contact-info-p">تلفن تماس : 38663000</p>
                            <p className="contact-info-p">پشتیبانی مشتریان : (9 الی 23)</p>
                        </div>
                    </div>

                    <div className="bottom-div-resinfo">
                        <img
                            src="./AS_Map.png"
                            alt="Maps"
                            className="res-info-pic"
                        />
                    </div>
                </div>
            </CSSTransition>
        </Content>
        )
}

export default RestaurantInfoComp;