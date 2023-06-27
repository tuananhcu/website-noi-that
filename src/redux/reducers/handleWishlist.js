import { toast } from "react-toastify";

const wishlist =
  localStorage.getItem("wishlistItems") !== null
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [];

const handleWishlist = (state = wishlist, action) => {
  const product = action.payload;
  switch (action.type) {
    case "TOGGLE_WISHLIST":
      // Check if Product already exists
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        let newState = state.filter((x) => x !== exist);
        localStorage.setItem("wishlistItems", JSON.stringify(newState));
        toast.success("Xóa thành công khỏi danh sách yêu thích");
        return newState;
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

    default:
      return state;
  }
};

export default handleWishlist;
