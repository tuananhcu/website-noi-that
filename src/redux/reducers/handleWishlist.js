import { toast } from "react-toastify";

const wishlist =
  localStorage.getItem("wishlistItems") !== null
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [];

const handleWishlist = (state = wishlist, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADD_WISHLIST":
      // Check if Product already exists
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        // Increase the quantity
        localStorage.setItem("wishlistItems", JSON.stringify(state));
        toast.error("Sản phẩm đã nằm trong danh sách yêu thích");
        return state;
      } else {
        const product = action.payload;
        let newState = [
          ...state,
          {
            ...product,
          },
        ];
        localStorage.setItem("wishlistItems", JSON.stringify(newState));
        toast.success("Đã thêm vào danh sách yêu thích");
        return newState;
      }

    case "REMOVE_WISHLIST":
      // Check if Product already exists
      const exist2 = state.find((x) => x.id === product.id);
      let newState = state.filter((x) => x !== exist2);
      localStorage.setItem("wishlistItems", JSON.stringify(newState));
      toast.success("Xóa thành công khỏi danh sách yêu thích");
      return newState;

    default:
      return state;
  }
};

export default handleWishlist;
