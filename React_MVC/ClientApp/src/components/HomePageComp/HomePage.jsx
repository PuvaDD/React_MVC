import "./HomePage.css"
import React, { useEffect, useState } from 'react';
import { Content, Nav, Carousel, IconButton, Icon, Drawer, Header, Input, Divider, Badge, Alert } from 'rsuite';
import FoodMenuComp from "../FoodMenuComp/FoodMenu"
import RestaurantInfoComp from "../RestaurantInfoComp/RestaurantInfo"
import { connect } from 'react-redux'
import Cookies from 'js-cookie';

function MyNavItem({ active, onSelect, ...props }) {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect}>
            <Nav.Item className="nav-items" id="menu-nav-btn" eventKey="menu">منو غذا</Nav.Item>
            <Nav.Item className="nav-items" id="resi-nav-btn" eventKey="info">اطلاعات رستوران</Nav.Item>
        </Nav>
    )
}

function HomePageComp({ ...props }) {

    const [active, setactive] = useState("menu")
    const [showDrawer, setshowDrawer] = useState(false)
    const [jiggleButton, setjiggleButton] = useState(false)

    const HandleNavState = (eventKey) => {
        if (eventKey === "menu") {
            setactive("menu")
        } else {
            setactive("info")
        }
    }

    const NavContentRenderer = () => {
        if (active === "menu") {
            return <FoodMenuComp setjiggleButton={setjiggleButton} setshowDrawer={setshowDrawer} />
        } else {
            return <RestaurantInfoComp />
        }
    }

    const AddToShoppingList = (foodItem) => {

        props.AddOneToShoppingList(foodItem)
    }

    const RemoveFromShoppingList = (foodItem) => {

        props.RemoveOneFromShoppingList(foodItem)
    }

    const RemoveFoodFromList = (foodItem) => {

        props.RemoveItemFromShoppingList(foodItem)
    }

    const CalculateSum = () => {

        var sum = 0

        for (var i = 0; i < props.shoppingList.length; i++) {
            if (props.shoppingList[i] !== undefined) {
                var foodItemSum = props.shoppingList[i].price * props.shoppingList[i].quantity
                sum += foodItemSum;
            }
        }
        return sum.toLocaleString('en');
    }

    const CurrentTime = () => {
        var time = new Date()
        if (time.getHours() < 22 || time.getHours() > 9) return true
    }

    const RenderShoppingListItems = () => {

        props.updateShoppingList()

        return (
            props.shoppingList.map((item, i) => {

                var itemPrice = item.price
                var convertedPrice = itemPrice.toLocaleString('en')
                var totalPrice = (itemPrice * item.quantity).toLocaleString('en')
                    return (
                        <div className="shopping-item-main-div" key={i} style={i % 2 === 0 ? { backgroundColor: "#f1ebeb" } : { backgroundColor: "#fafafc" }}>
                            <IconButton icon={<Icon icon="trash" size="2x" id="shopping-item-remove-icon" />} className="shopping-item-remove" onClick={() => RemoveFoodFromList(item)} style={i % 2 === 0 ? { backgroundColor: "#f1ebeb" } : { backgroundColor: "#fafafc" }} />
                            <div className="shopping-item-credentials">{totalPrice}</div>
                            <div className="shopping-item-credentials">{convertedPrice}</div>
                            <div className="shopping-item-credentials">عدد</div>
                            <div className="shopping-item-input-div">
                                <IconButton circle id="minus-icon" size="xs" icon={<Icon icon="minus-circle" size="2x" id="shopping-list-add-remove-btn" />} onClick={() => RemoveFromShoppingList(item)} />
                                <Input value={item.quantity} />
                                <IconButton circle id="plus-icon" size="xs" icon={<Icon icon="plus-circle" size="2x" id="shopping-list-add-remove-btn" />} onClick={() => AddToShoppingList(item)} />
                            </div>
                            <div className="shopping-item-credentials">{item.name}</div>
                            <img className="shopping-item-img" src="./AmirShahanFood.png" alt="AmirShahanFood" height="10px" width="10px" />
                        </div>
                    )
                })
            )
    }

    const ToggleDrawer = () => {
        if (Object.keys(props.shoppingList).length <= 0) {
            setshowDrawer(!showDrawer)
            Alert.info("سبد خرید شما خالی است", 1000)
        } else {
            setshowDrawer(true)
        }
    }

    const toggleDrawerOff = () => {
        setshowDrawer(false)
    }

    console.log("shoppingList = ", props.shoppingList)
    console.log("Signed In Cookie = ", Cookies.get("signedInCookie"))
    console.log("INIT COOKIE = ", Cookies.get("InitCookie"))

    return (
        <Content className="home-content">
            <div className="top-div">
                <Carousel autoplay placement="bottom" shape="bar">
                    <img
                        src="/food_1.jpg"
                        alt="food_1"
                    />
                    <img
                        src="/food_2.jpg"
                        alt="food_2"
                    />
                    <img
                        src="/food_3.jpg"
                        alt="food_3"
                    />
                </Carousel>

                <div className="carousel-text-container">
                    <div className="restaurant-name">امیر شاهان</div>
                    <div className="restaurant-adress">هفت تیر 5</div>
                </div>
            </div>

            <div className="bottom-div-main">
                <div className="open-closed-div">

                    <span className="online-offline-text">{CurrentTime() === true ? "سفارش می پذیریم" : "سفارش نمی پذیریم"}</span>
                    <i className="online-offline-icon" style={CurrentTime() === true ? { backgroundColor: "limegreen" } : { backgroundColor: "red" }}></i>

                </div>

                <div className="bottom-div">
                    <div className="bottom-nav-div">
                        <MyNavItem className="home-nav" appearance="tabs" active={active} onSelect={HandleNavState} />
                    </div>

                    <div className="food-sec-div">{NavContentRenderer()}</div>
                </div>

                
            </div>

            <div className="toggle-drawer-btn">
                <Badge content={Object.keys(props.shoppingList).length > 0 ? Object.keys(props.shoppingList).length : null} style={jiggleButton ? { transition: "1s all", transform: "scale(1.5)" } : { transition: "1s all", transform: "scale(1)" }}>
                    <img src="./Chefbaran.png" alt="ShoppingList" height="100px" width="100px" onClick={ToggleDrawer} />
                </Badge>
            </div>

            <Drawer full backdrop={true} placement="bottom" show={Object.keys(props.shoppingList).length <= 0 ? false : showDrawer} onEnter={RenderShoppingListItems}>
                <Drawer.Header>
                    <Header>
                        <div className="drawer-header-div">
                            {window.innerWidth <= 500 ?
                                <>
                                    <Icon className="drawer-header-icon-btn" icon="caret-left" onClick={toggleDrawerOff} />
                                </> :
                                <>
                                    <IconButton className="drawer-close-btn" icon={<Icon icon="caret-left" />} onClick={toggleDrawerOff}>"بازگشت به فروشگاه"</IconButton>
                                </>
                            }
                            
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
                            {Object.keys(props.shoppingList).length > 0 ? RenderShoppingListItems() : null}
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

const mapStateToProps = (state) => {
    return {
        shoppingList: state.shoppingList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AddOneToShoppingList: (foodItem) => { dispatch({ type: "ShoppingList_Btn_Add", payload: foodItem }) },
        RemoveItemFromShoppingList: (foodItem) => { dispatch({ type: "ShoppingList_Remove", payload: foodItem }) },
        RemoveOneFromShoppingList: (foodItem) => { dispatch({ type: "ShoppingList_Btn_Remove", payload: foodItem }) },
        updateShoppingList: () => { dispatch({ type: "ShoppingList_Update" }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComp)