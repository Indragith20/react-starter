import React from 'react';
import classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import BackDrop from './../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sidedrawer = (props) =>{
    let attachedClasses = [classes.Sidedrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.Sidedrawer,classes.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                <NavigationItems authenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sidedrawer;