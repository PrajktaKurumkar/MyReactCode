const initialState = {
  Ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  totalPrice: 20
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
        }
      };
    case "REMOVE_Ingredients":
      return {
        ...state,
        Ingredients: {
          ...state.Ingredients,
          [action.IngredientsName]:
            state.Ingredients[action.IngredientsName] - 1
        }
      };
    default:
      return state;
  }
};
export default reducer;
