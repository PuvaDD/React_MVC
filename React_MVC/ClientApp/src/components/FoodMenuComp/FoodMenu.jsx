import React, { useEffect, useState } from 'react';
import { Content, Panel, Divider, IconButton, Icon } from 'rsuite';
import { connect } from 'react-redux';
import "./FoodMenu.css";

function FoodCtgElement({ foods, setfoodsToShow, onClick, ...props }) {

    const SetFoodInfo = (event) => {

        var foodType = event.target.getAttribute("data-food-type")

        foods.filter(foodItem => {
            if (foodItem.type === foodType) {
                setfoodsToShow(foodItem.foodList)
            }
        })
    }

    return (
        foods.map((food, i) => {
            return (
                <div key={i} style={{ display: "inline" }} className="ctg-element" onClick={SetFoodInfo}>
                    {food.type === "فست فود" ? <> <img className="ctg-element-img" src="burger.png" alt="FastFood"data-food-type={food.type}/> </> : null}
                    {food.type === "کلاسیک" ? <> <img className="ctg-element-img" src="desert.png" alt="Classic"data-food-type={food.type}/> </> : null}
                    {food.type === "نوشیدنی" ? <> <img className="ctg-element-img" src="drink.png" alt="Drink"data-food-type={food.type}/> </> : null}

                    <div className="food-name" data-food-type={food.type}>
                        {food.type}
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
        console.log("Mounted Again")
    }, [props.foodList])

    const GatherData = async () => {
        var res = await FetchFoodData();

        res.filter(foodItem => {
            if (foodItem.type === "فست فود") {
                setfoodsToShow(foodItem.foodList)
            }
        })
    }

    const FetchFoodData = async () => {

        const response = await fetch('Food');
        const result = await response.json();

        if (Object.keys(props.foodList).length <= 0) {
            props.GetFoodList(result);
            return result
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

        console.log(foodItem)
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

    console.log("Foodlist = ", props.foodList)
    console.log("Foods To Show = ", foodsToShow)
    return (
            <Content>

                <div className="menu-div">

                    <div className="menu-div-inner">

                    <div className="menu-food-type" id="FoodHeader">
                            <FoodCtgElement foods={props.foodList} setfoodsToShow={setfoodsToShow} />
                        </div>

                        <div className="food-section">
                            {RenderFoodItems()}
                        </div>

                    </div>

                </div>

            </Content>
    )
}

const mapStateToProps = (state) => {
    return {
        foodList: state.foodList,
        shoppingList: state.shoppingList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetFoodList: (foodList) => { dispatch({ type: "Get_FoodList", payload: foodList }) },
        addToShoppingList: (foodItem) => { dispatch({ type: "ShoppingList_Add", payload: foodItem }) },
        removeFromShoppingList: (foodItem) => { dispatch({ type: "ShoppingList_Remove_One", payload: foodItem }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodMenuComp)