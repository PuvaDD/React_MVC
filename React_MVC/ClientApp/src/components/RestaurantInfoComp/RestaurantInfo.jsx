import React from 'react';
import { Content } from 'rsuite'
import "./RestaurantInfo.css"

function RestaurantInfoComp() {

    return (
        <Content>
            <div className="resinfo-main-div">
                <div className="top-div-resinfo">
                    <div className="info-div">
                        <p className="contact-info-p">: آدرس</p>
                        <p className="contact-info-p">مشهد - بین هفت تیر 3 و 5 , امیر شاهان</p>
                        <p className="contact-info-p">تلفن تماس : 38663000</p>
                        <p className="contact-info-p">پشتیبانی مشتریان : (9 الی 23)</p>
                    </div>

                    <tbody className="availability-div">
                        <tr className="info-table">
                            <td>--</td>
                            <td>--</td>
                            <td>08:00 تا 23:00</td>
                            <td className="weekday">شنبه</td>
                        </tr>
                        <tr className="info-table">
                            <td>--</td>
                            <td>--</td>
                            <td>08:00 تا 23:00</td>
                            <td className="weekday">یکشنبه</td>
                        </tr>
                        <tr className="info-table">
                            <td>--</td>
                            <td>--</td>
                            <td>09:00 تا 23:00</td>
                            <td className="weekday">دوشنبه</td>
                        </tr>
                        <tr className="info-table">
                            <td>--</td>
                            <td>--</td>
                            <td>09:00 تا 23:00</td>
                            <td className="weekday">سه شنبه</td>
                        </tr>
                        <tr className="info-table">
                            <td>--</td>
                            <td>--</td>
                            <td>09:00 تا 23:00</td>
                            <td className="weekday">چهارشنبه</td>
                        </tr>
                        <tr className="info-table">
                            <td>--</td>
                            <td>--</td>
                            <td>09:00 تا 23:00</td>
                            <td className="weekday">پنج شنبه</td>
                        </tr>
                        <tr className="info-table">
                            <td>--</td>
                            <td>--</td>
                            <td>09:00 تا 23:00</td>
                            <td className="weekday">جمعه</td>
                        </tr>
                    </tbody>
                </div>

                <div className="bottom-div-resinfo">
                    <img
                        src="./AS_Map.png"
                        alt="Maps"
                        className="res-info-pic"
                    />
                </div>
            </div>
        </Content>
        )
}

export default RestaurantInfoComp;