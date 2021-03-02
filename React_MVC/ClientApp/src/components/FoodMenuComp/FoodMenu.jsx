import React, { useEffect, useState } from 'react';
import { Content, Panel, Divider } from 'rsuite';
import "./FoodMenu.css";

function FoodCtgElement({ foods, setfoodsToShow, onClick, ...props }) {

    const SetFoodInfo = (event) => {

        var foodType = event.target.getAttribute("data-food-type")

        foods.filter(foodItem => {
            if (foodItem.name === foodType) {
                setfoodsToShow(foodItem.foodList)
            }
        })
    }

    return (
        foods.map((food, i) => {
            return (
                <div key={i} style={{ display: "inline" }} className="ctg-element" onClick={SetFoodInfo}>
                    {food.name === "FastFood" ? <> <img src="burger.png" alt="FastFood" height="80px" width="80px" data-food-type={food.name}/> </> : null}
                    {food.name === "Classic" ? <> <img src="desert.png" alt="Classic" height="80px" width="80px" data-food-type={food.name}/> </> : null}
                    {food.name === "Drink" ? <> <img src="drink.png" alt="Drink" height="80px" width="50px" data-food-type={food.name}/> </> : null}

                    <div className="food-name" data-food-type={food.name}>
                        {food.name}
                   </div>
               </div>
            )
        })
    )
}

function FoodMenuComp() {

    const [foods, setfoods] = useState([])
    const [foodsToShow, setfoodsToShow] = useState([])

    useEffect(() => {
        GatherData()
    }, [])

    const GatherData = async () => {
        var res = await FetchFoodData();
        res.filter(foodItem => {
            if (foodItem.name === "FastFood") {
                setfoodsToShow(foodItem.foodList)
            }
        })
    }

    const FetchFoodData = async () => {
        const response = await fetch('Food');
        const result = await response.json();
        setfoods(result);
        return result
    }

    const RenderFoodItems = () => {
        if (Object.keys(foodsToShow).length < 0) return;
        else {
            return (
                foodsToShow.map((foodItem, i) => {
                    return (
                        <Panel bordered shaded key={i} className="food-item-panel" style={{ display: "inline" }}>
                            <div className="food-item-div">
                                <div className="panel-image">
                                    <img className="food-item-img" src="./AmirShahanFood.png" alt="Food Item" />
                                    <div className="food-item-name">{foodItem.name}</div>
                                </div>

                                <Divider className="food-item-divider"/>

                                <div className="panel-info">
                                    <Panel>
                                        <div className="food-item-info">
                                            <span>ریال</span>
                                            <span className="food-item-price">{foodItem.price}</span>
                                        </div>
                                    </Panel>
                                </div>
                            </div>
                        </Panel>
                    )
                })
            )
        }
    }

    console.log("Foods to Show = ", foodsToShow)
    console.log("Foods = ", foods)
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