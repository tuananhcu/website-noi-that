const cart =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      // Check if Product already exists
      const exist = state.find(
        (x) => x.material === product.material && x.id === product.id
      );
      if (exist) {
        // Increase the quantity
        let newState = state.map((x) =>
          x.material === product.material && x.id === product.id
            ? { ...x, qty: x.qty + 1 }
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
            qty: 1,
          },
        ];
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      }

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

    default:
      return state;
  }
};

export default handleCart;
