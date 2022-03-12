import axios from "axios";

export const addToppings = () => {
  return {
    type: "ADD_PIZZA",
  };
};

export const removeToppings = () => {
  return {
    type: "REMOVE_PIZZA",
  };
};

export const sortByPriceAsc = () => {
  return {
    type: "SORT_ASC_BY_PRICE",
  };
};

export const sortByPriceDsc = () => {
  return {
    type: "SORT_DESC_BY_PRICE",
  };
};

export const sortByRatingAsc = () => {
  return {
    type: "SORT_ASC_BY_RATING",
  };
};

export const sortByRatingDsc = () => {
  return {
    type: "SORT_DESC_BY_RATING",
  };
};

export const showAllPizzas = () => {
  return {
    type: "SHOW_ALL_PIZZAS",
  };
};

export const sortByVeg = () => {
  return {
    type: "SORT_BY_VEG",
  };
};

export const sortByNonVeg = () => {
  return {
    type: "SORT_BY_NONVEG",
  };
};

export const addToCart = (pizza) => {
  return {
    type: "ADD_TO_CART",
    payload: pizza,
  };
};

export const addAddOns = (addOns) => {
  return {
    type: "ADD_ADD_ONS",
    payload: addOns,
  };
};

export const removePizzaFromcart = (id) => {
  return {
    type: "REMOVE_PIZZA",
    payload: id
  };
};

export const totalPriceAdder = (totalPriceData) => {
  return {
    type: "TOTAL_PRICE_ADDED",
    payload: totalPriceData
  };
};

export const totalPriceSubtracter = (totalPriceData) => {
  return {
    type: "TOTAL_PRICE_SUBTRACTER",
    payload: totalPriceData
  };
};

//Action creator
export const getList = (pizzaList) => {
  return {
    type: "FETCH_PIZZALIST",
    payload: pizzaList,
  };
};

//Action creator
export const fetchList =  () => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68`
    );
    dispatch(getList(response.data));
  };
};
