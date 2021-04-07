var initState = {
    foodList: [],
    shoppingList: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {

        case "Get_FoodList":

            var List = action.payload;

            return {
                ...state,
                foodList: List
            }
            break;

        case "ShoppingList_Add":

            var foodItem_1 = action.payload

            var foundItem_1 = state.shoppingList.find(item => {
                if (item.id === foodItem_1.id) return true;
            })

            if (foundItem_1) {

                var newFoodListData_1 = state.foodList.map(item => {
                    if (item.id === foundItem_1.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                var newShoppingListData_1 = state.shoppingList.map(item => {
                    if (item.id === foundItem_1.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData_1,
                    shoppingList: newShoppingListData_1
                }

            } else {
                foodItem_1.quantity++;

                var newFoodListData_2 = state.foodList.map(item => {
                    if (item.id === foodItem_1.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData_2,
                    shoppingList: [...state.shoppingList, foodItem_1]
                }
            }

            break;

        case "ShoppingList_Remove_One":

            var foodItem_2 = action.payload;
            /*var newFoodListData_3;*/
            var newShoppingListData_2;

            foodItem_2.quantity--

            newShoppingListData_2 = state.shoppingList.map(item => {
                if (item.id === foodItem_2.id) {
                    item.quantity--
                    return item
                } else {
                    return item
                }
            })

/*            newFoodListData_3 = state.foodList.map(item => {
                if (item.catagory === foodItem_2.catagory) {
                    for (var i = 0; i < item.foodList.length; i++) {
                        if (item.foodList[i].id === foodItem_2.id) {
                            item.foodList[i].quantity--
                            return item
                        } else {
                            return item
                        }
                    }
                } else {
                    return item
                }
            })*/

            return {
                ...state,
                /*foodList: newFoodListData_3,*/
                shoppingList: newShoppingListData_2
            }
            break;

        case "ShoppingList_Btn_Add":

            var foodItem_3 = action.payload

            var foundItem_3 = state.shoppingList.find(item => {
                if (item.id === foodItem_3.id) return true;
            })

            if (foundItem_3) {

                var newShoppingListData_3 = state.shoppingList.map(item => {
                    if (item.id === foodItem_3.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                var newFoodListData_4 = state.foodList.map(item => {
                    if (item.id === foundItem_3.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData_4,
                    shoppingList: newShoppingListData_3
                }
            }
            break;

        case "ShoppingList_Btn_Remove":

            var foodItem_4 = action.payload

            var foundItem_4 = state.shoppingList.find(item => {
                if (item.id === foodItem_4.id) return true;
            })

            if (foundItem_4) {

                var newShoppingListData_4 = state.shoppingList.map(item => {
                    if (item.id === foodItem_4.id) {
                        item.quantity--
                        return item
                    } else {
                        return item
                    }
                })

                var newFoodListData_5 = state.foodList.map(item => {
                    if (item.id === foundItem_4.id) {
                        item.quantity--
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData_5,
                    shoppingList: newShoppingListData_4
                }
            }
            break;

        case "ShoppingList_Remove":

            var foodItem_5 = action.payload

            foodItem_5.quantity = 0

            var newShoppingList = state.shoppingList.filter(item => {
                if (item.id !== foodItem_5.id) return item;
            })

            var newFoodListData_6 = state.foodList.map(item => {
                if (item.id === foodItem_5.id) {
                    item.quantity = 0
                    return item
                } else {
                    return item
                }
            })

            return {
                ...state,
                foodList: newFoodListData_6,
                shoppingList: newShoppingList
            }
            break;

        case "ShoppingList_Update":

            var { updatedList, foodItemToRemove } = action.payload

            var updatedFoodList = state.foodList.map(catagory => {
                if (catagory.type === foodItemToRemove.type) {
                    for (var i = 0; i < catagory.foodList.length; i++) {
                        if (catagory.foodList[i].id === foodItemToRemove.id) {
                            catagory.foodList[i].quantity = 0
                            return catagory
                        } else {
                            return catagory
                        }
                    }
                } else {
                    return catagory
                }
            })

            return {
                ...state,
                foodList: updatedFoodList,
                shoppingList: updatedList
            }
            break;

        default:
            return state
    }
}

export default rootReducer;