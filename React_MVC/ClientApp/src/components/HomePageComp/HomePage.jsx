import React, { useEffect, useState } from 'react';
import { Content, Nav, Carousel, IconButton, Icon, Drawer, Header, Input, Divider } from 'rsuite';
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
    const [showDrawer, setshowDrawer] = useState(false)
    const [foodsToShow, setfoodsToShow] = useState([])
    const [shoppingList, setshoppingList] = useState([])
    const [updatedFoodList, setupdatedFoodList] = useState([])

    const HandleNavState = (eventKey) => {
        if (eventKey === "menu") {
            setactive("menu")
        } else {
            setactive("info")
        }
    }

    const NavContentRenderer = () => {
        if (active === "menu") {
            return <FoodMenuComp updatedFoodList={updatedFoodList} setupdatedFoodList={setupdatedFoodList} foodsToShow={foodsToShow} setfoodsToShow={setfoodsToShow} shoppingList={shoppingList} setshoppingList={setshoppingList} />
        } else {
            return <RestaurantInfoComp />
        }
    }

    const AddToShoppingList = (foodItem) => {

        var foundItem = shoppingList.find(item => {
            if (item.id === foodItem.id) return true;
        })

        if (foundItem) {

            var newShoppingListData = shoppingList.map(item => {
                if (item.id === foodItem.id) {
                    item.quantity++
                    return item
                } else {
                    return item
                }
            })

            setshoppingList(newShoppingListData)
        }
    }

    const RemoveFromShoppingList = (foodItem) => {

        var foundItem = shoppingList.find(item => {
            if (item.id === foodItem.id) return true;
        })

        if (foundItem) {

            var newShoppingListData = shoppingList.map(item => {
                if (item.id === foodItem.id) {
                    item.quantity--
                    return item
                } else {
                    return item
                }
            })

            setshoppingList(newShoppingListData)
        }
    }

    const RemoveFoodFromList = (foodItem) => {

        var foundItem = shoppingList.find(item => {
            if (item.id === foodItem.id) return true;
        })

        if (foundItem) {

            foundItem.quantity = 0

            var newShoppingList = shoppingList.filter(item => {
                if (item.id !== foodItem.id) return item;
            })

            setshoppingList(newShoppingList)
        }
    }

    const CalculateSum = () => {

        var sum = 0

        for (var i = 0; i < shoppingList.length; i++) {
            if (shoppingList[i] !== undefined) {
                var foodItemSum = shoppingList[i].price * shoppingList[i].quantity
                sum += foodItemSum;
            }
        }
        return sum;
    }

    const RenderShoppingListItems = () => {

        for (var i = 0; i < shoppingList.length; i++) {
            if (shoppingList[i].quantity <= 0) {
                var updatedList = shoppingList.filter(item => {
                    if (item !== shoppingList[i]) {
                        return item;
                    }
                })
                setshoppingList(updatedList)
            }
        }

        return (
            shoppingList.map((item, i) => {
                        return (
                            <div className="shopping-item-main-div" key={i} style={i % 2 === 0 ? { backgroundColor: "#f1ebeb" } : { backgroundColor: "#fafafc" }}>
                                <IconButton icon={<Icon icon="trash" size="2x" id="shopping-item-remove-icon" />} className="shopping-item-remove" onClick={() => RemoveFoodFromList(item)} style={i % 2 === 0 ? { backgroundColor: "#f1ebeb" } : { backgroundColor: "#fafafc" }} />
                                <div className="shopping-item-credentials">{item.price * item.quantity}</div>
                                <div className="shopping-item-credentials">{item.price}</div>
                                <div className="shopping-item-credentials">عدد</div>
                                <div className="shopping-item-input-div">
                                    <IconButton circle id="minus-icon" icon={<Icon icon="minus-circle" size="5x" id="shopping-list-add-remove-btn" />} onClick={() => RemoveFromShoppingList(item)} />
                                    <Input value={item.quantity} />
                                    <IconButton circle id="plus-icon" icon={<Icon icon="plus-circle" size="5x" id="shopping-list-add-remove-btn" />} onClick={() => AddToShoppingList(item)} />
                                </div>
                                <div className="shopping-item-credentials">{item.name}</div>
                                <img className="shopping-item-img" src="./AmirShahanFood.png" alt="AmirShahanFood" height="10px" width="10px" />
                            </div>
                        )
                })
            )
    }

    const ToggleDrawer = () => {
        setshowDrawer(!showDrawer)
    }

    console.log("MAPPED LIST = ", updatedFoodList)
    console.log("Shopping List = ", shoppingList)
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
                <div>ONLINE</div>

                <div className="bottom-div">
                    <div className="bottom-nav-div">
                        <MyNavItem className="home-nav" appearance="tabs" active={active} onSelect={HandleNavState} />
                    </div>

                    <div className="food-sec-div">{NavContentRenderer()}</div>
                </div>

                <div>
                    <IconButton icon={<Icon icon="dot-circle-o"/>} onClick={ToggleDrawer}></IconButton>
                </div>
            </div>

            <Drawer full backdrop={true} placement="bottom" show={showDrawer} onHide={ToggleDrawer} onEnter={RenderShoppingListItems}>
                <Drawer.Header>
                    <Header>
                        <div className="drawer-header-div">
                            <IconButton className="drawer-close-btn" icon={<Icon icon="caret-left"/>} onClick={ToggleDrawer}>بازگشت به فروشگاه</IconButton>
                            <div className="drawer-header-text-div" ><span className="drawer-header-text">سبد خرید شما   <Icon icon="shopping-basket" /></span></div>
                            <img className="header-logo" src="/logo.png" alt="logo" height="100px" />
                        </div>
                    </Header>
                </Drawer.Header>
                <Drawer.Body>
                    <div className="drawer-body-main-div">
                        <div className="drawer-body-top-div">
                            <span className="drawer-top-div-text">قیمت<span style={{ fontWeight: 100}}>(ریال)</span></span>
                            <span className="drawer-top-div-text">فی</span>
                            <span className="drawer-top-div-text">واحد</span>
                            <span className="drawer-top-div-text">مقدار</span>
                            <span className="drawer-top-div-text">محصول</span>
                        </div>

                        <div className="drawer-body-bottom-div">
                            {Object.keys(shoppingList).length > 0 ? RenderShoppingListItems() : null}
                        </div>

                        <div className="drawer-sum-div">
                            <Divider className="drawer-divider" />
                            <span className="sum-span">{CalculateSum()} جمع کل</span>
                        </div>
                    </div>
                </Drawer.Body>
            </Drawer>
        </Content>
    )
}

export default HomePageComp;