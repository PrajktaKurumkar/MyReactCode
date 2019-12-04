import React from "react";
import logoImage from "../../assets/Images/burger-logo.png";
import classes from "./Logo.css";

const Logo = () => (
  <div className={classes.Logo}>
    <img src={logoImage} alt="MyBurger" />
  </div>
);
export default Logo;
