import "./FoodMenu.css";
import React, { useEffect, useState } from 'react';
import { Content, Panel, Divider, IconButton, Icon } from 'rsuite';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Cookies from 'js-cookie';

function FoodCtgElement({ foodCtg, foodList, setfoodsToShow, onClick, ...props }) {

    const SetActiveCTG = (event) => {

        var foodType = Number(event.target.getAttribute("data-food-type-id"))

        var activeCTG = foodList.filter(foodItem => {
            
            if (foodItem.catagoryID === foodType) {
                return foodItem
            }
        })
        setfoodsToShow(activeCTG)

        var ctgHeaderOffsetTop = window.scrollY + document.querySelector('.open-closed-div').getBoundingClientRect().top //why scroll y

        window.scrollTo({
            top: ctgHeaderOffsetTop,
            left: 0,
            behavior: "smooth"
        })
    }
    
    return (
        foodCtg.map((ctg, i) => {
            return (
                <div key={i} style={{ display: "inline" }} className="ctg-element" data-food-type-id={ctg.id} onClick={SetActiveCTG}>
                    {ctg.type === "فست فود" ? <> <img className="ctg-element-img" src="burger.png" alt="FastFood" data-food-type-id={ctg.id}/> </> : null}
                    {ctg.type === "کلاسیک" ? <> <img className="ctg-element-img" src="desert.png" alt="Classic" data-food-type-id={ctg.id}/> </> : null}
                    {ctg.type === "نوشیدنی" ? <> <img className="ctg-element-img" src="drink.png" alt="Drink" data-food-type-id={ctg.id}/> </> : null}

                    <div className="food-name" data-food-type-id={ctg.id} onClick={SetActiveCTG}>
                        {ctg.type}
                   </div>
               </div>
            )
        })
    )
}

function FoodMenuComp({ setjiggleButton, setshowDrawer, ...props }) {

    const [foodsToShow, setfoodsToShow] = useState([])

    useEffect(() => {
        GatherData();
    }, [])

    useEffect(() => {

    }, [props.foodList])

    const GatherData = async () => {
        var res = await FetchFoodData();

        var initFoodToShow = res.filter(foodItem => {
            if (foodItem.catagoryID === 1) {
                return foodItem
            }
        })

        setfoodsToShow(initFoodToShow)
    }

    const FetchFoodData = async () => {

        var signedInCookie = Cookies.get("signedInCookie")
        var initCookie = Cookies.get("InitCookie")

        var cookieToBeSent = signedInCookie !== undefined ? JSON.parse(signedInCookie).SL : JSON.parse(initCookie).SL
        console.log("cookieToBeSent = ", typeof JSON.stringify(cookieToBeSent), JSON.stringify(cookieToBeSent))

        const response = await fetch('Food/GetFoodData')

        /*const response = await fetch('Food/GetFoodData', {
            method: "Post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                cookieSL: cookieToBeSent
            })
        })*/
        const result = await response.json();
        console.log("Ress returned = ", result)
        
        if (Object.keys(props.foodList).length <= 0) {

            props.GetFoodList(result.foodList, result.ctg);

            return result.foodList
        } else {
            return props.foodList
        }
    }

    const AddToShoppingList = (foodItem) => {

        setshowDrawer(false)

        setjiggleButton(true)
        setTimeout(() => {
            setjiggleButton(false)
        },100)

        props.addToShoppingList(foodItem)

        /*console.log(foodItem)*/
    }

    const RemoveFromShoppingList = (foodItem) => {

        props.removeFromShoppingList(foodItem)
    }

    const RenderFoodItems = () => {
        if (Object.keys(foodsToShow).length < 0) return;
        else {
            return (
                foodsToShow.map((foodItem, i) => {
                    return (
                        <Panel bordered shaded key={i} className="food-item-panel" style={{ display: "inline" }} onClick={() => { AddToShoppingList(foodItem) }}>
                            <div className="food-item-div">
                                <div className="panel-image">
                                    <img className="food-item-img" src="./AmirShahanFood.png" alt="Food Item" />
                                    <div className="food-item-name">{foodItem.name}</div>
                                </div>

                                <Divider className="food-item-divider"/>

                                <div className="panel-info">
                                    <Panel>
                                        <div className="food-item-info">
                                            <span style={{ fontWeight: 700 }}>ریال</span>
                                            <span className="food-item-price">{(foodItem.price).toLocaleString('en')}</span>
                                        </div>
                                    </Panel>
                                </div>
                            </div>

                            <span className="badge-main-div" style={foodItem.quantity <= 0 ? { display: "none" } : {}}>
                                <div className="badge-quantity">{`عدد ${foodItem.quantity}`}</div>
                                <IconButton circle className="badge-plus-icon" size="sm" icon={<Icon icon="minus" />} onClick={() => RemoveFromShoppingList(foodItem)}></IconButton>
                            </span>
                        </Panel>
                    )
                })
            )
        }
    }
/*
    console.log("Foodlist = ", props.foodList)
    console.log("Foods To Show = ", foodsToShow)*/

    return (
            <Content>

                <div className="menu-div">

                    <div className="menu-div-inner">

                        <div className="menu-food-type" id="FoodHeader">
                            <FoodCtgElement foodCtg={props.foodCtg} foodList={props.foodList} setfoodsToShow={setfoodsToShow} />
                        </div>

                        <TransitionGroup>
                            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                <div className="food-section">
                                    {RenderFoodItems()}
                                </div>
                            </CSSTransition>
                        </TransitionGroup>

                    </div>

                </div>

            </Content>
    )
}

const mapStateToProps = (state) => {
    return {
        foodList: state.foodList,
        foodCtg: state.foodCtg,
        shoppingList: state.shoppingList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetFoodList: (List, ctg) => { dispatch({ type: "Get_FoodList", payload: { List, ctg } }) },
        addToShoppingList: (foodItem) => { dispatch({ type: "ShoppingList_Add", payload: foodItem }) },
        removeFromShoppingList: (foodItem) => { dispatch({ type: "ShoppingList_Remove_One", payload: foodItem }) },
        UpdateStateUsingCookie: (foodsToUpdate) => { dispatch({ type: "UpdateState_UsingCookies", payload: foodsToUpdate }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodMenuComp)