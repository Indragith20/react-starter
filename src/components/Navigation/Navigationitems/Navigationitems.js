import React from 'react';
import NavigationItem from './Navigationitem/Navigationitem';
import classes from './Navigationitems.css';

const navigationItems=(props)=>{ 
    return (
        <ul className={classes.Navigationitems}>
            <NavigationItem link="/">BurgerBuilder</NavigationItem>
            <NavigationItem link="/orders">My Orders</NavigationItem>
            {props.authenticated?<NavigationItem link="/logout">LOGOUT</NavigationItem>:
                                    <NavigationItem link="/auth">LOGIN</NavigationItem>}
        </ul>
    );
}

export default navigationItems;