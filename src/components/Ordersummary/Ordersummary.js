import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';

class ordersummary extends Component{
   componentWillUpdate(){
       console.log("Will Update");
   } 
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map((key)=>{
            return (
            <li key={key}>
                <span style={{textTransform:'capitalize'}}>{key}</span> : {this.props.ingredients[key]}
            </li>
            );
        });
        return (
            <Aux>
                <h3>YOur Order</h3>
                <p>A delicious burger with following ingredients</p>
                <ul>{ingredientSummary}</ul>
                <p><strong>Total Price : {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType='Danger' clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button> 
            </Aux>
        );
    }
}


export default ordersummary;