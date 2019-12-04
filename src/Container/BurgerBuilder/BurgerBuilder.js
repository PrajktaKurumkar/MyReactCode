import React, { Component } from "react";
import Aux from "../../Hoc/auxillery";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 10,
  meat: 20,
  bacon: 20,
  cheese: 10
};
class BurgerBuilder extends Component {
  state = {
    Ingredients: null,
    totalPrice: 20,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://react-burger-app-815ec.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ Ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  updatePurchaseState = Ingredients => {
    const sum = Object.keys(Ingredients)
      .map(igKey => {
        return Ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldcount = this.state.Ingredients[type];
    const updatedCount = oldcount + 1;
    const updatedIngredients = { ...this.state.Ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, Ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldcount = this.state.Ingredients[type];
    if (oldcount <= 0) {
      return;
    }
    const updatedCount = oldcount - 1;
    const updatedIngredients = { ...this.state.Ingredients };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, Ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  purchasehandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    const queryParams = [];
    for (let i in this.state.Ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.Ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
    /* this.setState({ loading: true 
    });
    const order = {
      Ingredients: this.state.Ingredients,
      Price: this.state.totalPrice,
      customer: {
        name: "Prajkta",
        Address: {
          Country: "India",
          State: "Maharashtra"
        }
      },
      emailId: "test@test.com",
      deliveryMode: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });*/
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>
        <strong>Ingredients cant be loaded..!!</strong>
      </p>
    ) : (
      <Spinner />
    );

    if (this.state.Ingredients) {
      burger = (
        <Aux>
          <Burger Ingredients={this.state.Ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchasehandler}
            disabled={disabledInfo}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          Ingredients={this.state.Ingredients}
          continuePurchase={this.continuePurchaseHandler}
          cancelPurchase={this.cancelPurchaseHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          cancelModal={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
export default withErrorHandler(BurgerBuilder, axios);
