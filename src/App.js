import "./App.css";
import PizzaList from "./components/PizzaList";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import EmptyCart from "./components/EmptyCart";




function App() {
  const cart = useSelector((state) => state.cart);
  console.log(cart.length)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PizzaList />} />
          {/* ADD TOASTIFY */}
          <Route path='/cart' element={cart.length>0 ? <Cart /> : <EmptyCart />} />    
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
