import handleCart from "./handleCart";
import handleWishlist from "./handleWishlist";
import { combineReducers } from "redux";

const rootReducres = combineReducers({
  handleCart,
  handleWishlist,
});

export default rootReducres;
