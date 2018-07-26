import React,{ Component } from 'react';
import CheckoutSummary from './../../components/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
// import * as orderTypes from '../../store/actions/index';

class Checkout extends Component{

    state={
        ingredient:{
            salad:0,
            meat:0,
            bacon:0,
            cheese:0
        },
        totalprice:4
    }

    orderCancelHandler = () =>{
        this.props.history.goBack(); 
    }

    
    orderPlaceHandler= () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    // componentWillMount(){
    //     this.props.purchaseStart();
    // }
    
    render(){
        console.log(this.props);
        let summary = <Redirect to="/" />
        if(this.props.orderedItems){
            const purchasedRedirect = this.props.purchased?<Redirect to="/" />:null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.orderedItems} onCancel={this.orderCancelHandler}
                        onContinue={this.orderPlaceHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} 
                                    component={ContactData}/>
                </div>);
        }
        return summary;
        
    }
}

const mapStateToProps = state =>{
    return {
        orderedItems:state.burgerBuilder.ingredient,
        purchased:state.order.purchased
    }
}

// const mapDispatchToProps = dispatch =>{
//     return {
//         purchaseStart:() => dispatch(orderTypes.purchaseInit())
//     }
// }



export default connect(mapStateToProps)(Checkout);