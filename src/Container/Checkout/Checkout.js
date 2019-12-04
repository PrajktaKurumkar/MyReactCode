import React, { Component } from "react";
import CheckoutOrderSummary from "../../Components/Order/CheckoutOrdersummary/CheckoutOrderSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
class Checkout extends Component {
  state = {
    Ingredients: null,
    price: 0
  };

  componentWillMount() {
    const querry = new URLSearchParams(this.props.location.search);
    const Ingredients = {};
    let price = 0;
    for (let params of querry.entries()) {
      if (params[0] === "price") {
        price = params[1];
      } else {
        Ingredients[params[0]] = +params[1];
      }
    }

    this.setState({ Ingredients: Ingredients });
  }
  checkoutCancelledHandller = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandller = () => {
    this.props.history.replace("/checkout/checkout-Id");
  };

  render() {
    return (
      <div>
        <CheckoutOrderSummary
          Ingredients={this.state.Ingredients}
          checkoutCancelled={this.checkoutCancelledHandller}
          checkoutContinued={this.checkoutContinuedHandller}
        />
        <Route
          path={this.props.match.url + "/checkout-Id"}
          render={props => (
            <ContactData
              Ingredients={this.state.Ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;
