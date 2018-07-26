import React,{Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from './../../store/actions/order';
import Spinner from './../../components/UI/Spinner/Spinner';

class Orders extends Component{
    // state={
    //     orders:[],
    //     loading:true
    // }
    componentDidMount(){
        this.props.fetchOrders(this.props.tokenStored);
    }
    render(){
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = (
                this.props.ordersPlaced.map((item)=>{
                    return <Order key={item.id} orderActive={item.ingredients} price={+item.price}/>
                })
            )
        }
        
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ordersPlaced:state.order.orders,
        loading:state.order.loading,
        tokenStored:state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchOrders:(token)=>dispatch(orderActions.fetchOrders(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));