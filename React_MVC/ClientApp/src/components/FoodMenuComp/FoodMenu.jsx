import React, { useEffect, useState } from 'react';
import { Content, Panel, Divider, IconButton, Icon } from 'rsuite';
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
                    {food.type === "FastFood" ? <> <img src="burger.png" alt="FastFood" height="80px" width="80px" data-food-type={food.type}/> </> : null}
                    {food.type === "Classic" ? <> <img src="desert.png" alt="Classic" height="80px" width="80px" data-food-type={food.type}/> </> : null}
                    {food.type === "Drink" ? <> <img src="drink.png" alt="Drink" height="80px" width="50px" data-food-type={food.type}/> </> : null}

                    <div className="food-name" data-food-type={food.type}>
                        {food.type}
                   </div>
               </div>
            )
        })
    )
}

function FoodMenuComp({ foodsToShow, setfoodsToShow, shoppingList, setshoppingList, updatedFoodList, setupdatedFoodList }) {

    const [foods, setfoods] = useState([])

    useEffect(() => {
        GatherData();

        return () => {
            UpdateFoodListForNextRender()
        }
    }, [])

    const GatherData = async () => {
        var res = await FetchFoodData();

        if (Object.keys(updatedFoodList).length > 0) {
            updatedFoodList.filter(foodItem => {
                if (foodItem.type === "FastFood") {
                    setfoodsToShow(foodItem.foodList)
                }
            })
        } else {
            res.filter(foodItem => {
                if (foodItem.type === "FastFood") {
                    setfoodsToShow(foodItem.foodList)
                }
            })
        }

        console.log("FETCH RES = ", res)
    }

    const FetchFoodData = async () => {

        if (Object.keys(updatedFoodList).length > 0) {
            setfoods(updatedFoodList)
            return updatedFoodList
        } else {
            const response = await fetch('Food');
            const result = await response.json();
            setfoods(result);
            return result
        }
    }

    const UpdateFoodListForNextRender = () => {

        if (Object.keys(shoppingList).length > 0) {
            console.log("In Update Func")

            var foodDataForNextRender = foods.map(item => {

                for (var i = 0; i < item.foodList.length; i++) {
                    for (var j = 0; j < shoppingList.length; j++) {

                        if (item.type === shoppingList[j].catagory) {
                            for (var k = 0; k < item.foodList.length; k++) {

                                if (item.foodList[k].id === shoppingList[i].id) {
                                    item.foodList[k] = shoppingList[i]
                                    return item
                                } else {
                                    return item
                                }
                            }
                        }
                    }
                }
            })

            console.log("U = ", foodDataForNextRender)
            setupdatedFoodList(foodDataForNextRender)
        } else {
            console.log("Im in ELSE")
        }
    }

    const AddToShoppingList = (foodItem) => {

        var foundItem = shoppingList.find(item => {
            if (item.id === foodItem.id) return true;
        })

        if (foundItem) {

            var newShoppingListData = shoppingList.map(item => {
                if (item.id === foundItem.id) {
                    item.quantity++
                    return item
                } else {
                    return item
                }
            })

            setshoppingList(newShoppingListData)

        } else {
            foodItem.quantity++;
            setshoppingList([...shoppingList, foodItem])
        }
        console.log("ITEM = ", foodItem)

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
                                            <span className="food-item-price">{foodItem.price}</span>
                                        </div>
                                    </Panel>
                                </div>
                            </div>

                            <span className="badge-main-div" style={foodItem.quantity <= 0 ? { display: "none" } : {}}>
                                <div className="badge-quantity">{`${foodItem.quantity} عدد`}</div>
                                <IconButton circle className="badge-plus-icon" size="sm" icon={<Icon icon="minus" />} onClick={() => RemoveFromShoppingList(foodItem)}></IconButton>
                            </span>
                        </Panel>
                    )
                })
            )
        }
    }

    console.log("Food List = ", foods)

    return (
            <Content>

                <div className="menu-div">

                    <div className="menu-div-inner">

                        <div className="menu-food-type">
                            <FoodCtgElement foods={foods} setfoodsToShow={setfoodsToShow} />
                        </div>

                        <div className="food-section">
                            {RenderFoodItems()}
                        </div>

                    </div>

                </div>

            </Content>
    )
}

export default FoodMenuComp;