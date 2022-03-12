import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Pizza from "./Pizza";
import { v4 as uuidv4 } from "uuid";
import classes from "../styles/Cart.module.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const val = useSelector((state) => state.totalPizzaPrice);

  let totalPrice = val.reduce(function (initial, currPrice) {
    return initial + currPrice.price;
  }, 0);

  return (
    <>
      <Header />
      {cart.length > 0 &&
        cart.map((cartPizza) => {
          return (
            <Pizza
              key={uuidv4()}
              pizzaId={cartPizza.pizzaId}
              name={cartPizza.name}
              image={cartPizza.image}
              description={cartPizza.description}
              pizzaCartQuantity={cartPizza.pizzaQuantity}
              price={cartPizza.price}
              rating={cartPizza.rating}
              isVeg={cartPizza.isVeg}
              pizzaCartSize={cartPizza.addOns.pizzaSize}
              pizzaCartToppings={cartPizza.addOns.pizzaToppings}
              isCart={true}
            />
          );
        })}
      <div className={classes.price}>
        <h1  className={classes.priceText}>Amount: {totalPrice}<small>💲</small></h1>
      </div>
    </>
  );
};

export default Cart;
