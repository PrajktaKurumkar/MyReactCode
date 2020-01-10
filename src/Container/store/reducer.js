const initialState = {
  Ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  totalPrice: 20
};
const INGREDIENT_PRICE = {
  salad: 10,
  meat: 20,
  bacon: 20,
  cheese: 10
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_Ingredients":
      return {
        ...state,
        Ingredients: {
          ...state.Ingredients,
          [action.IngredientsName]:
            state.Ingredients[action.IngredientsName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.IngredientsName]
      };
    case "REMOVE_Ingredients":
      return {
        ...state,
        Ingredients: {
          ...state.Ingredients,
          [action.IngredientsName]:
            state.Ingredients[action.IngredientsName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.IngredientsName]
      };
    default:
      return state;
  }
};
export default reducer;
