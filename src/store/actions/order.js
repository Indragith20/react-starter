import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id,orderdata) =>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderdata
    }
}

export const purchaseBurgerFail = (error) =>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerIntial = () =>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () =>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) =>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail = () =>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrderStart = () =>{
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
} 

export const purchaseBurgerStart = (orderdata,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerIntial());
        axios.post('/orders.json?auth='+token,orderdata)
            .then((res)=>{
                dispatch(purchaseBurgerSuccess(res.data.name,orderdata));
            })
            .catch((err)=>{
                dispatch(purchaseBurgerFail(err));
            });
    }
}

export const fetchOrders = (token) =>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth='+token)
                .then((res)=>{
                    console.log(res);
                    let fetchedOrders = [];
                    for(let key in res.data){
                        fetchedOrders.push({
                            ...res.data[key],
                            id:key
                        });   
                    }
                    dispatch(fetchOrderSuccess(fetchedOrders));
                })
                .catch((err)=>{
                    dispatch(fetchOrderFail());
                })
    }
}
