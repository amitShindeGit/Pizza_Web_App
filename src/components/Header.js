import React from "react";
import classes from '../styles/Header.module.css';
import { Link} from "react-router-dom";


const Header = () => {
  return (
      <nav>
        <ul className={classes.nav}>
          <Link to="/" className={classes.list}>Pizzas</Link>
          <Link to="/cart" className={classes.list}>Cart</Link>
        </ul>
      </nav>
  );
};

export default Header;
