import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Ordersummary from '../../components/Ordersummary/Ordersummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import WithErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component{
    state = {
        purchasable:false,
        purchasing:false,
        loading:false
    };

    componentDidMount(){
        this.props.initIngredients();
    }

    updatePurchaseStatus = (ingredient) => {
        const ingredientSum = Object.keys(ingredient)
                                    .map((key)=>{
                                        return ingredient[key];
                                    })
                                    .reduce((sum,el)=>{
                                        return sum+el;
                                    },0);
        //this.setState({purchasable:ingredientSum>0});                          
        return ingredientSum>0;
    }

    // addIngredient = (type) => {
    //     //updating ingredient count
    //     const ingredientCount = this.state.ingredient[type] + 1;
    //     const updatedIngredients = {...this.state.ingredient};
    //     updatedIngredients[type] = ingredientCount;
    //     //updating price
    //     const newPrice = this.state.totalprice + INGREDIENT_PRICES[type];

    //     this.setState({totalprice:newPrice,ingredient:updatedIngredients});
    //     this.updatePurchaseStatus(updatedIngredients);

    // }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        //alert('Contine');
        this.props.purchaseStart();
        this.props.history.push({
            pathname:'/checkout',
            params:{'ingredient':this.state.ingredient,'totalprice':this.state.totalprice}
        });
    }
 
    // removeIngredient = (type) => {
    //     const ingredientCount = this.state.ingredient[type] - 1;
    //     const updatedIngredients = {...this.state.ingredient};
    //     updatedIngredients[type] = ingredientCount;
    //     //updating price
    //     const newPrice = this.state.totalprice - INGREDIENT_PRICES[type];

    //     this.setState({totalprice:newPrice,ingredient:updatedIngredients});
    //     this.updatePurchaseStatus(updatedIngredients);
    // }

    render(){
        const disableInfo = {...this.props.ings};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0;
        }

        let orderSummary = null;
        let burger = this.props.error?<p>Ingredients cant be loaded</p>:<Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                                ingredientRemoved={this.props.onIngredientRemoved}
                                totalPrice={this.props.price}
                                disabled={disableInfo}
                                ordered={this.purchaseHandler}
                                purchase={this.updatePurchaseStatus(this.props.ings)}
                                />
                </Aux>);
            orderSummary = <Ordersummary ingredients={this.props.ings} 
                                cancel={this.purchaseCancelHandler}
                                continue={this.purchaseContinueHandler}
                                totalPrice={this.props.price}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalprice,
        error:state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch =>{
     return{
         onIngredientAdded: (ingName) =>dispatch(burgerBuilderActions.addIngredient(ingName)),
         onIngredientRemoved: (ingName) =>dispatch(burgerBuilderActions.removeIngredient(ingName)),
         initIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
         purchaseStart:() => dispatch(burgerBuilderActions.purchaseInit())
     }
}


export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));