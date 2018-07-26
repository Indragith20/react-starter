import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'}
];

const buildControls = (props) =>{
    return (
        <div className = {classes.BuildControls}>
            <p>Current Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map((ctrl)=>{
              return <BuildControl key={ctrl.type} 
                        label={ctrl.label}
                        added = {()=>props.ingredientAdded(ctrl.type)}
                        removed = {()=>{props.ingredientRemoved(ctrl.type)}}
                        disabled={props.disabled[ctrl.type]}
                        />  
            })}
            <p>Status{props.purchase}</p>
            <button className={classes.ButtonControls} disabled={!props.purchase}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;