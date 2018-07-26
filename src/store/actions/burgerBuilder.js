import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) =>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) =>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) =>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredient:ingredients
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://react-demo-app-b007a.firebaseio.com/ingredients.json')
                    .then((response)=>{
                        dispatch(setIngredients(response.data))
                    })
                    .catch((error)=>{
                         dispatch(fetchIngredientsFailed());
                    })
    }
}

