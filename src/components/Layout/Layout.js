import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from './../Navigation/Sidedrawer/Sidedrawer';
import {connect} from 'react-redux';

class layout extends Component{
    state={
        showSideDrawer:true
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});  
    }

    drawerToggle=()=>{
        //this.setState({showSideDrawer:!this.state.showSideDrawer})
        this.setState((prevstate)=>{
            return { showSideDrawer:!prevstate.showSideDrawer };
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAutheticated} clicked={this.drawerToggle}/>
                <Sidedrawer open={this.state.showSideDrawer} isAuth={this.props.isAutheticated} 
                    closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        );
    }
}
    
const mapStateToProps = (state)=>{
    return {
        isAutheticated: state.auth.token!==null
    }
}


export default connect(mapStateToProps)(layout);
