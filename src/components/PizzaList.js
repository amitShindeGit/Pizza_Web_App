import React, { useEffect, useState } from "react";
import Header from "./Header";
import Pizza from "./Pizza";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from '../state-management/action/action';
import Sort from "./Sort";

const PizzaList = () => {
  // let [pizzalist, setPizzaList] = useState([]);
  const pizzaList = useSelector((state) => state.pizzaList);
  const vegNonVegPizzaList = useSelector((state) => state.vegOrNonVegPizzaList);
  const isVegOrNonVeg = useSelector((state) => state.isVegOrNonVeg)
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchList());
  }, []);

  // console.log(vegNonVegPizzaList)

  return (
    <>
      <Header />
      <Sort sortName='Price' />
      <Sort  sortName='Rating' />
      <Sort sortName='TYPE' />
      {!isVegOrNonVeg ? pizzaList.map((pizza) => {
        return (
          <Pizza
            key={pizza.id}
            pizzaId={pizza.id}
            name={pizza.name}
            image={pizza.img_url}
            description={pizza.description}
            price={pizza.price}
            rating={pizza.rating}
            isVeg={pizza.isVeg}
            size={pizza.size}
            toppings={pizza.toppings}
            isCart={false}
          />
        );
      })
      :
      (
        vegNonVegPizzaList.map((pizza) => {
        return (
          <Pizza
            key={pizza.id}
            pizzaId={pizza.id}
            name={pizza.name}
            image={pizza.img_url}
            description={pizza.description}
            price={pizza.price}
            rating={pizza.rating}
            isVeg={pizza.isVeg}
            size={pizza.size}
            toppings={pizza.toppings}
            isCart={false}
          />
        );
      }) 
      )
      }
    </>
  );
};

export default PizzaList;
