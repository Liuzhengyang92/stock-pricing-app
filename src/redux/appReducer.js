import * as actionTypes from './actionTypes';

const initialState = {
  stockList: [],
};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const updateStockList = (state, action) => {
  return updateObject(state, {
    stockList: action.payload.stockList
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STOCK_LIST:
      return updateStockList(state, action);
    default:
      return state;
  }
};

export default reducer;