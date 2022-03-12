import { createStore,  applyMiddleware } from "redux";
import pizzaReducer from './reducer/pizzaReducer'
import thunk from 'redux-thunk'

const store = createStore(pizzaReducer, applyMiddleware(thunk));

export default store;