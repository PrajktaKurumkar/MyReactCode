import React, { Component } from "react";
import classes from "./BurgerIngredient.css";
import PropTypes from "prop-types";

class BurgerIngredients extends Component {
  render() {
    let Ingredients = null;
    switch (this.props.type) {
      case "bread-bottom":
        Ingredients = <div className={classes.BreadBottom}></div>;
        break;
      case "bread-top":
        Ingredients = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        Ingredients = <div className={classes.Meat}></div>;
        break;
      case "cheese":
        Ingredients = <div className={classes.Cheese}></div>;
        break;
      case "salad":
        Ingredients = <div className={classes.Salad}></div>;
        break;
      case "bacon":
        Ingredients = <div className={classes.Bacon}></div>;
        break;
      default:
        Ingredients = null;
    }
    return Ingredients;
  }
}
BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredients;
