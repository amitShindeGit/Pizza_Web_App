import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classes from '../styles/Pizza.module.css';
import Addons from './modal/Addons';

const Pizza = ({ pizzaId ,name, image, description, price, rating, isVeg, size, toppings, isCart, pizzaCartQuantity, pizzaCartToppings, pizzaCartSize }) => {
    const dispatch = useDispatch();
    const pizzaQuantity = useSelector((state) => state.pizzaQuantity);  
    const addOns =  useSelector((state) => state.addOns);
    const addOnIndex =  addOns.findIndex((addOn) => addOn.pizzaId === pizzaId);
       
    const pizzaAddHandler = () => {
        dispatch({type: "TOTAL_PRICE_ADDER", payload: {pizzaId, price, pricePerQty: price}})
        
        if(addOns.length > 1){    
            if(addOnIndex !== -1){
                dispatch({ type: "ADD_TO_CART", payload: {pizzaId,image, name, description, price, isVeg,pizzaQuantity, addOns:addOns[addOnIndex]} });
            }else{
                dispatch({ type: "ADD_TO_CART", payload: {pizzaId,image, name, description, price, isVeg,pizzaQuantity,  addOns:{ pizzaId: pizzaId, pizzaSize: 'Regular', pizzaToppings: []}} });

            }
        }else{
            dispatch({ type: "ADD_TO_CART", payload: {pizzaId,image, name, description, price, isVeg,pizzaQuantity,  addOns:{ pizzaId: pizzaId, pizzaSize: 'Regular', pizzaToppings: []}} });
        }
    }

    const pizzaRemoveHandler = () => {
        dispatch({ type: 'REMOVE_PIZZA', payload: {pizzaId, pizzaCartQuantity,pizzaCartToppings, pizzaCartSize}  })
        dispatch({ type: "TOTAL_PRICE_SUBTRACTER", payload: {pizzaId, price, pricePerQty: price} })
    }

  return (
      <>
    <figure className={classes.pizza}>
    <div className={classes.pizzahero}>
        <img src={image} alt="pizza" className={classes.pizzaimg }/>
    </div>
    <div className={classes.pizzacontent}>
        <div className={classes.pizzatitle}>
            <h1 className={classes.pizzaheading}>{name}</h1>
            <div className={`${classes.pizzatag} ${isVeg && classes.pizzatag1} ${!isVeg && classes.pizzatag2}`}>{isVeg ? '#Vegetarian' : '#Non_Vegetarian'}</div>
            {isCart && <div className={classes.pizzaTagCart}>x{pizzaCartQuantity}</div>}
        </div>
        <p className={classes.pizzadescription}>{description}</p>
        <br />
        {isCart && <h1 className={classes.pizzadescription}>Size: {pizzaCartSize} </h1>}
        {(isCart && pizzaCartToppings.length > 0) && <h1 className={classes.pizzadescription}>Toppings: {`${pizzaCartToppings} ${','}`} </h1>}
        <div className={classes.pizzadetails}>
            {!isCart && <div className={classes.pizzadetail}><span className={classes.emoji}>⭐</span>{rating}</div>}
            <div className={classes.pizzadetail}><span className={classes.emoji}>💲</span>{price}</div>
            <div className={classes.pizzadetail}><button className={classes.emojibtn} onClick={pizzaAddHandler}>➕</button>add</div>
            {isCart && <div className={classes.pizzadetail}><button className={classes.emojibtn} onClick={pizzaRemoveHandler}>➖</button>remove</div>}

        </div>
    </div>
    {!isCart && <div className={classes.pizzapopup}>
    <Addons pizzaId={pizzaId} size={size} toppings={toppings} />
    </div>}
</figure>

</>
  )
}

export default Pizza