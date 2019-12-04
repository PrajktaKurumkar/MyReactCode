import React from "react";
import Aux from "../../../Hoc/auxillery";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.Ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.Ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price} Rs.</strong>
      </p>
      <p>Continue to Checkout??</p>
      <div>
        <Button btnType="Danger" click={props.cancelPurchase}>
          CANCEL
        </Button>
        <Button btnType="Success" click={props.continuePurchase}>
          CONTINUE
        </Button>
      </div>
    </Aux>
  );
};

export default OrderSummary;
