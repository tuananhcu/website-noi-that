// For adding item to the Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// Increase Product
export const addOne = (product) => {
  return {
    type: "INCREASE",
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

//Pay cart
export const payCart = () => {
  return {
    type: "PAY",
  };
};

// product Selected
export const toggleSelected = (product) => {
  return {
    type: "SELECT",
    payload: product,
  };
};

//Toggle wishlist
export const toggleWishlist = (product) => {
  return {
    type: "TOGGLE_WISHLIST",
    payload: product,
  };
};
