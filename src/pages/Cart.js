import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addOne, delCart, removeCart, toggleSelected } from "../redux/action";
import slugifyText from "../utils/slugifyText";
import formatCurrency from "../utils/formatCurrency";

const Cart = () => {
  const history = useNavigate();

  useEffect(() => {
    document.title = "Giỏ hàng của bạn";
  }, []);

  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  let totalAmount = state.reduce((acc, cur) => {
    if (cur.isSelected === true) {
      return acc + cur.price * cur.qty;
    }
    return acc;
  }, 0);

  const handleIncrease = (product) => {
    dispatch(addOne(product));
  };

  const handleDel = (product) => {
    if (product.qty > 1) {
      dispatch(delCart(product));
    } else {
      toast.error("Số lượng sản phẩm đã giảm đến mức tối thiểu");
    }
  };

  const handleRemove = (product) => {
    dispatch(removeCart(product));
  };

  const handleProductSelection = (product) => {
    dispatch(toggleSelected(product));
  };

  const handleBuy = () => {
    if (totalAmount) {
      history("/thanh-toan");
    } else {
      toast.error("Bạn chưa chọn sản phẩm nào để mua");
    }
  };

  const emptyCart = () => {
    return (
      <div className="cart-layout empty-cart">
        <Link to={"/san-pham"}>
          <h3>Bấm vào đây để tiếp tục mua hàng!</h3>
        </Link>
        <img
          className="empty-cart__image"
          src="./images/empty-cart.png"
          alt="emptyCart"
        />
      </div>
    );
  };

  const cartItems = (product, index) => {
    return (
      <div className="cart-box" key={index}>
        <div>
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={() => handleProductSelection(product)}
          />
        </div>
        <div>
          <Link
            to={`/${slugifyText(product.category)}/${slugifyText(
              product.product_name
            )}`}
          >
            <img
              className="box-item__image"
              src={product.image}
              alt="san pham"
            />
          </Link>
        </div>
        <div>
          {product.product_name} - {product.material}
        </div>
        <div>
          <span>{formatCurrency(product.price)}</span>
        </div>
        <div className="box-item__btn">
          <button
            className="btn qty_btn btn-left"
            onClick={() => handleDel(product)}
          >
            <i className="fa fa-minus"></i>
          </button>
          <div className="qty_input">{product.qty}</div>
          <button
            className="btn qty_btn btn-right"
            onClick={() => handleIncrease(product)}
          >
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div>
          <span>{formatCurrency(product.price * product.qty)}</span>
        </div>
        <div className="btn-remove" onClick={() => handleRemove(product)}>
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    );
  };

  const buttons = () => {
    return (
      <div className="cart-layout">
        <div className="total-price">
          Tổng tiền :&nbsp;
          <span>{formatCurrency(totalAmount)}</span>
        </div>
        <div className="group-btn">
          <button className="btn">
            <Link to={"/san-pham"}>Chọn thêm sản phẩm khác</Link>
          </button>
          <button className="btn" onClick={handleBuy}>
            Thanh toán ngay
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="cart">
      <div id="map-link-bar" style={{ width: "100%" }}>
        <ul>
          <li>
            <Link to={"/"}>Trang chủ</Link>
          </li>
          <li>
            <Link to={""}>Giỏ hàng</Link>
          </li>
        </ul>
      </div>
      {state.length === 0 ? (
        emptyCart()
      ) : (
        <>
          <div className="cart-header">
            <div></div>
            <div>Ảnh sản phẩm</div>
            <div>Tên sản phẩm</div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div>Thành tiền</div>
            <div> Xóa</div>
          </div>
          {state.map(cartItems)}
          <div className="cart-bill">{buttons()}</div>
        </>
      )}
    </div>
  );
};

export default Cart;
