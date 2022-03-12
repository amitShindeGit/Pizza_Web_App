import * as _ from "lodash";

const initialState = {
  pizzaList: [],
  vegOrNonVegPizzaList: [],
  isVegOrNonVeg: false,
  cart: [],
  addOns: [{ pizzaId: null, pizzaSize: "Regular", pizzaToppings: [] }],
  pizzaQuantity: 1,
  totalPizzaPrice : [{pizzaId: null, price: 0, pricePerQty: 0}],
};

const pizzaReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SORT_ASC_BY_PRICE":
      return {
        ...state,
        pizzaList: _.orderBy(state.pizzaList, ["price"], ["asc"]),
        vegOrNonVegPizzaList: _.orderBy(
          state.vegOrNonVegPizzaList,
          ["price"],
          ["asc"]
        ),
      };

    case "SORT_DESC_BY_PRICE":
      return {
        ...state,
        pizzaList: _.orderBy(state.pizzaList, ["price"], ["desc"]),
        vegOrNonVegPizzaList: _.orderBy(
          state.vegOrNonVegPizzaList,
          ["price"],
          ["desc"]
        ),
      };

    case "SORT_ASC_BY_RATING":
      return {
        ...state,
        pizzaList: _.orderBy(state.pizzaList, ["rating"], ["asc"]),
        vegOrNonVegPizzaList: _.orderBy(
          state.vegOrNonVegPizzaList,
          ["rating"],
          ["asc"]
        ),
      };

    case "SORT_DESC_BY_RATING":
      return {
        ...state,
        pizzaList: _.orderBy(state.pizzaList, ["rating"], ["desc"]),
        vegOrNonVegPizzaList: _.orderBy(
          state.vegOrNonVegPizzaList,
          ["rating"],
          ["desc"]
        ),
      };

    case "SHOW_ALL_PIZZAS":
      return {
        ...state,
        pizzaList: state.pizzaList,
        isVegOrNonVeg: false,
      };

    case "SORT_BY_VEG":
      return {
        ...state,
        vegOrNonVegPizzaList: _.filter(state.pizzaList, { isVeg: true }),
        isVegOrNonVeg: true,
      };

    case "SORT_BY_NONVEG":
      return {
        ...state,
        vegOrNonVegPizzaList: _.filter(state.pizzaList, { isVeg: false }),
        isVegOrNonVeg: true,
      };

    case "ADD_TO_CART":
      const existingCartItem = state.cart.find(
        (item) =>
          item.pizzaId === action.payload.pizzaId &&
          item.addOns.pizzaSize === action.payload.addOns.pizzaSize &&
          JSON.stringify(item.addOns.pizzaToppings) === //check if working
            JSON.stringify(action.payload.addOns.pizzaToppings)
      );
      

      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item === existingCartItem) {
              return { ...item, pizzaQuantity: item.pizzaQuantity + 1};
            } else {
              return { ...item };
            }
          }),
        };
      } else {

        return {
          ...state,
          cart: state.cart.concat(action.payload),
          
        };

      }

    case "ADD_ADD_ONS": //separate addOne for each pizza, filter accordingly and update accordingly
      const existingAddOns = state.addOns.find(
        (addOn) => addOn.pizzaId === action.payload[0].pizzaId
      );
      if (existingAddOns) {
        return {
          ...state,
          addOns: state.addOns.map((addOn) => {
            if (existingAddOns.pizzaId === addOn.pizzaId) {
              return {
                ...addOn,
                pizzaSize: action.payload[0].pizzaSize,
                pizzaToppings: action.payload[0].pizzaToppings,
              };
            } else {
              return { ...addOn };
            }
          }),
        };
      } else {
        return {
          ...state,
          addOns: state.addOns.concat(action.payload),
        };
      }

    case "REMOVE_PIZZA":
      const { pizzaId, pizzaCartQuantity, pizzaCartToppings, pizzaCartSize } =
        action.payload;
      const pizzaToDelete = state.cart.findIndex(
        (pizza) =>
          pizza.pizzaId === pizzaId &&
          pizza.addOns.pizzaSize === pizzaCartSize &&
          (pizzaCartToppings.length > 0
            ? JSON.stringify(pizza.addOns.pizzaToppings) ===
              JSON.stringify(pizzaCartToppings)
            : pizza.addOns.pizzaToppings === pizzaCartToppings)
      );


      if (state.cart[pizzaToDelete].pizzaQuantity >= 0) {

        if (state.cart[pizzaToDelete].pizzaQuantity === 1) {    
        state.cart = state.cart.map((pizza) => {
          if (pizza === state.cart[pizzaToDelete]) {
              return { ...pizza, pizzaQuantity: pizza.pizzaQuantity - 1 };    //since the pizzaQuantity is received late
            } else {
              return { ...pizza };
            }
          });

          return {
            ...state,
            cart: state.cart.filter((cartItem) => cartItem.pizzaQuantity !== 0), //if <1 delete cartItem
          };
        }else{
          return {
            ...state,
            cart: state.cart.map((pizza) => {
              if (pizza === state.cart[pizzaToDelete]) {
                //check for double entries
                return { ...pizza, pizzaQuantity: pizza.pizzaQuantity - 1 };
              } else {
                return { ...pizza };
              }
            }),
          };
        }
      }

      case "TOTAL_PRICE_ADDER":
        const exisitingPizzaPrice = state.totalPizzaPrice.find((price) => 
          price.pizzaId === action.payload.pizzaId
        )

        if(exisitingPizzaPrice){
          return {
            ...state,
            totalPizzaPrice: state.totalPizzaPrice.map((item) => {
              if(item === exisitingPizzaPrice){

                return {...item, price: item.price + action.payload.price}
              }else{
                return {...item};
              }
            }) 
          }
        }else{
          return {...state,
            totalPizzaPrice: state.totalPizzaPrice.concat(action.payload)
          };
        }

        case "TOTAL_PRICE_SUBTRACTER" :
          const exisitingPizzaPricee = state.totalPizzaPrice.find((price) => 
          price.pizzaId === action.payload.pizzaId
        )

        if(exisitingPizzaPricee){
          return {
            ...state,
            totalPizzaPrice : state.totalPizzaPrice.map((item) => {
              if(item === exisitingPizzaPricee){
                return {...item, price: item.price - action.payload.pricePerQty}
              }else{
                return {...item};
              }
            })
          }
        }


    case "FETCH_PIZZALIST":
      return {
        ...state,
        pizzaList: action.payload,
      };

    default:
      return state;
  }
};

export default pizzaReducer;
