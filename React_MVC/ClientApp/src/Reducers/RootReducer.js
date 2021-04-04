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

            var foodItem = action.payload

            var foundItem = state.shoppingList.find(item => {
                if (item.id === foodItem.id) return true;
            })

            if (foundItem) {

                var newFoodListData = state.foodList.map(item => {
                    if (item.id === foundItem.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                var newShoppingListData = state.shoppingList.map(item => {
                    if (item.id === foundItem.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData,
                    shoppingList: newShoppingListData
                }

            } else {
                foodItem.quantity++;

                var newFoodListData_2 = state.foodList.map(item => {
                    if (item.id === foodItem.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData_2,
                    shoppingList: [...state.shoppingList, foodItem]
                }
            }

            break;

        case "ShoppingList_Remove_One":

            var foodItem = action.payload;
            var newFoodListData;
            var newShoppingListData;

            foodItem.quantity--

            newShoppingListData = state.shoppingList.map(item => {
                if (item.id === foodItem.id) {
                    item.quantity--
                    return item
                } else {
                    return item
                }
            })

/*            newFoodListData = state.foodList.map(item => {
                if (item.catagory === foodItem.catagory) {
                    for (var i = 0; i < item.foodList.length; i++) {
                        if (item.foodList[i].id === foodItem.id) {
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

            console.log("REACHED")

            return {
                ...state,
                /*foodList: newFoodListData,*/
                shoppingList: newShoppingListData
            }
            break;

        case "ShoppingList_Btn_Add":

            var foodItem = action.payload

            var foundItem = state.shoppingList.find(item => {
                if (item.id === foodItem.id) return true;
            })

            if (foundItem) {

                var newShoppingListData = state.shoppingList.map(item => {
                    if (item.id === foodItem.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                var newFoodListData = state.foodList.map(item => {
                    if (item.id === foundItem.id) {
                        item.quantity++
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData,
                    shoppingList: newShoppingListData
                }
            }
            break;

        case "ShoppingList_Btn_Remove":

            var foodItem = action.payload

            var foundItem = state.shoppingList.find(item => {
                if (item.id === foodItem.id) return true;
            })

            if (foundItem) {

                var newShoppingListData = state.shoppingList.map(item => {
                    if (item.id === foodItem.id) {
                        item.quantity--
                        return item
                    } else {
                        return item
                    }
                })

                var newFoodListData = state.foodList.map(item => {
                    if (item.id === foundItem.id) {
                        item.quantity--
                        return item
                    } else {
                        return item
                    }
                })

                return {
                    ...state,
                    foodList: newFoodListData,
                    shoppingList: newShoppingListData
                }
            }
            break;

        case "ShoppingList_Remove":

            var foodItem = action.payload

            foodItem.quantity = 0

            var newShoppingList = state.shoppingList.filter(item => {
                if (item.id !== foodItem.id) return item;
            })

            var newFoodListData = state.foodList.map(item => {
                if (item.id === foodItem.id) {
                    item.quantity = 0
                    return item
                } else {
                    return item
                }
            })

            return {
                ...state,
                foodList: newFoodListData,
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