import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import DrawerToggle from './../Sidedrawer/Drawtoggle/Drawtoggle';

const toolbar = (props)=>{
    return(
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.clicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
               <NavigationItems authenticated={props.isAuth} />
            </nav>
        </header>
    );
}

export default toolbar;