// For adding item to the Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For deleting item from the Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

//Remove a product from the Cart
export const removeCart = (product) => {
  return {
    type: "REMOVE",
    payload: product,
  };
};

//add wishlist
export const addWishlist = (product) => {
  return {
    type: "ADD_WISHLIST",
    payload: product,
  };
};

//remove wishlist
export const removeWishlist = (product) => {
  return {
    type: "REMOVE_WISHLIST",
    payload: product,
  };
};
