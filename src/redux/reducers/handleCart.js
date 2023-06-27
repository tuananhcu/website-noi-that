const cart =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      const exist = state.find(
        (x) => x.material === product.material && x.id === product.id
      );
      if (exist) {
        let newState = state.map((x) =>
          x.material === product.material && x.id === product.id
            ? { ...x, qty: x.qty + product.qty }
            : x
        );
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      } else {
        const product = action.payload;
        let newState = [
          ...state,
          {
            ...product,
            qty: product.qty,
          },
        ];
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      }

    case "INCREASE":
      let increaseProduct = state.map((x) =>
        x.material === product.material && x.id === product.id
          ? { ...x, qty: x.qty + 1 }
          : x
      );
      localStorage.setItem("cartItems", JSON.stringify(increaseProduct));
      return increaseProduct;

    case "DELITEM":
      const exist1 = state.find(
        (x) => x.material === product.material && x.id === product.id
      );
      if (exist1.qty === 1) {
        let newState = state.filter((x) => x !== exist1);
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      } else {
        let newState = state.map((x) =>
          x.material === product.material && x.id === product.id
            ? { ...x, qty: x.qty - 1 }
            : x
        );
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      }

    case "REMOVE":
      const exist2 = state.find(
        (x) => x.material === product.material && x.id === product.id
      );
      let newState = state.filter((x) => x !== exist2);
      localStorage.setItem("cartItems", JSON.stringify(newState));
      return newState;

    case "SELECT":
      const updatedCartItems = state.map((item) => {
        if (item.id === product.id && item.material === product.material) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;

    case "PAY":
      const newCart = state.filter((item) => item.isSelected === false);
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return newCart;

    default:
      return state;
  }
};

export default handleCart;
