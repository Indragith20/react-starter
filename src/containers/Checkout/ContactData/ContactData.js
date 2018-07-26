import React,{Component} from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderTypes from '../../../store/actions/index';
import axios from '../../../axios-orders';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';

 class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[{
                        value:'fastest',
                        displayValue:'Fastest'
                    },{
                        value:'chepest',
                        displayValue:'Chepest'
                    }
                ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        formValid:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        const formData = {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        this.props.placeOrder(order,this.props.tokenStored);
    }

    checkValidity = (value,rules) =>{
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim()!=='' && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) =>{
        console.log(event.target.value);
        const updatedOrderform = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderform[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedOrderform[inputIdentifier] = updatedFormElement;
        let formStatus = true;
        for(let id in updatedOrderform){
            formStatus = updatedOrderform[id].valid && formStatus;
        }
        this.setState({
            orderForm:updatedOrderform,
            formValid:formStatus
        })
    }

    
    render(){

        const formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map((item)=>{
                    return <Input key={item.id} elementType={item.config.elementType} elementConfig={item.config.elementConfig}
                                value={item.config.value} shouldValidate={item.config.validation}
                                touched={item.config.touched}
                                invalid={!item.config.valid} changed={(event)=>this.inputChangeHandler(event,item.id)}/>
                })}
                <Button btnType="Success" disabled={!this.state.formValid} clicked={this.orderHandler}>Confirm Order</Button>
                </form>
        );
        if(this.props.loading){
            form=<Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
 }

const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalprice,
        loading:state.order.loading,
        tokenStored:state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        placeOrder:(orderDetails,token)=>dispatch(orderTypes.purchaseBurgerStart(orderDetails,token))
    }
}

 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));