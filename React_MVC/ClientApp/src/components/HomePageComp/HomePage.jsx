import React, { useState } from 'react';
import { Content, Nav, Carousel } from 'rsuite';
import FoodMenuComp from "../FoodMenuComp/FoodMenu"
import RestaurantInfoComp from "../RestaurantInfoComp/RestaurantInfo"
import "./HomePage.css"

function MyNavItem({ active, onSelect, ...props }) {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect}>
            <Nav.Item className="nav-items" eventKey="menu">منو غذا</Nav.Item>
            <Nav.Item className="nav-items" eventKey="info">اطلاعات رستوران</Nav.Item>
        </Nav>
    )
}

function HomePageComp() {

    const [active, setactive] = useState("menu")

    const HandleNavState = (eventKey) => {
        if (eventKey === "menu") {
            setactive("menu")
        } else {
            setactive("info")
        }
    }

    const NavContentRenderer = () => {
        if (active === "menu") {
            return <FoodMenuComp/>
        } else {
            return <RestaurantInfoComp />
        }
    }

    console.log("active = ", active)
    return (
        <Content className="home-content">
            <div className="top-div">
                <Carousel autoplay placement="bottom" shape="bar">
                    <img
                        src="/food_1.jpg"
                        alt="food_1"
                        height="400"
                    />
                    <img
                        src="/food_2.jpg"
                        alt="food_2"
                        height="400"
                    />
                    <img
                        src="/food_3.jpg"
                        alt="food_3"
                        height="400"
                    />
                </Carousel>

                <div className="carousel-text-container">
                    <div className="restaurant-name">امیر شاهان</div>
                    <div className="restaurant-adress">هفت تیر 5</div>
                </div>
            </div>

            <div className="bottom-div-main">

                <div className="bottom-div">
                    <div className="bottom-nav-div">
                        <MyNavItem appearance="tabs" active={active} onSelect={HandleNavState} />
                    </div>

                    <div>{NavContentRenderer()}</div>
                </div>

            </div>
        </Content>
    )
}

export default HomePageComp;