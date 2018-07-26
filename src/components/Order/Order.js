import React from 'react';
import classes from './Order.css';

const orders = (props) =>{
    const ingredients = [];
    for(let ingredient in props.orderActive){
        ingredients.push({
            name:ingredient,
            amount:props.orderActive[ingredient]
        });  
    }
    console.log(ingredients);
    const inOut = ingredients.map((item)=>{
        return <span key={item.name} 
                    style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px',
                            border:'1px solid #ccc',padding:'5px'}}>
                            {item.name}({item.amount}) 
                </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {inOut} </p>
            <p>TotalPrice:<strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default orders;