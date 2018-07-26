import React,{Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

class Auth extends Component{
    state ={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'PassWord'
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 6
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }

    checkValidity = (value,rules) =>{
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.length>=rules.minLength && isValid
        }

        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event,controlName) =>{
        console.log(event.target.value);
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
        
    }

    switchAuthModeHandler = () =>{
        this.setState((prevstate)=>{
             return {isSignup: !prevstate.isSignup}
        })
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAutheticateUser(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    render(){
        const formElements = [];
        for(let key in this.state.controls){
            formElements.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = formElements.map((item)=>{
            return (<Input key={item.id} elementType={item.config.elementType} elementConfig={item.config.elementConfig}
            value={item.config.value} shouldValidate={item.config.validation}
            touched={item.config.touched}
            invalid={!item.config.valid} changed={(event)=>this.inputChangeHandler(event,item.id)} />
            );
        })

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessages = null;
        if(this.props.error){
            errorMessages = (
                <p>{this.props.error.message}</p>
            )
        }
        return (
            <div className={classes.Auth}>
                {errorMessages}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" clicked={this.submitHandler}>SUBMIT</Button>
                </form> 
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        loading:state.auth.loading,
        error:state.auth.error
    }
}

const mapDispacthToProps = (dispatch) =>{
    return{
        onAutheticateUser:(email,password,isSignup)=>{dispatch(actions.autheticateUser(email,password,isSignup))}
    }
}

export default connect(mapStateToProps,mapDispacthToProps)(Auth);