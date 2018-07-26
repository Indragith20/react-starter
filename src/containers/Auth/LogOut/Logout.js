import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import * as authActions from '../../../store/actions/index';
import {connect} from 'react-redux';

class LogOut extends Component{
    componentDidMount(){
        this.props.onLogOut();
    }
    render(){
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogOut:()=>dispatch(authActions.logOut())
    }
}

export default connect(null,mapDispatchToProps)(LogOut);