import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutOrderSummary.css";
const CheckoutOrderSummary = props => {
  return (
    <div className={classes.CheckoutOrderSummary}>
      <h1>Great...!!you are gonna love it..!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger Ingredients={props.Ingredients} />
      </div>
      <div style={{}}>
        <Button btnType="Danger" click={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" click={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
