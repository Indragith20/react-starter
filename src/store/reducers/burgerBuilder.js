import * as actionTypes from '../actions/actionsTypes';


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};


const intialState = {
    ingredient:null,
    totalprice:4,
    error:false,

}

const reducer = (state = intialState,action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName]:state.ingredient[action.ingredientName]+1,
                },
                totalprice:state.totalprice+INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName]:state.ingredient[action.ingredientName]-1,
                },
                totalprice: state.totalprice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredient:action.ingredient,
                error:false,
                totalprice:4
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
    
}

export default reducer;