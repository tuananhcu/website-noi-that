import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, delCart, removeCart } from "../redux/action";
import slugifyText from "../utils/slugifyText";
import { toast } from "react-toastify";

const Cart = () => {
  const voucher = "hello";
  const [dataVoucher, setDataVoucher] = useState("");
  const [dataVoucher2, setDataVoucher2] = useState(0);

  useEffect(() => {
    document.title = "Giỏ hàng của bạn";
  }, []);

  const state = useSelector((state) => state.handleCart);

  const dispatch = useDispatch();

  const calTotalAmount = (state) => {
    let totalAmount = 0;
    state.forEach((item) => {
      totalAmount += item.price * item.qty;
    });
    return totalAmount;
  };

  const handleClick = () => {
    if (dataVoucher.toLowerCase() === voucher.toLowerCase()) {
      toast.success("Nhập mã voucher thành công");
      setDataVoucher2(1000000);
    } else {
      toast.error("Mã giảm giá không đúng hoặc đã hết !");
    }
  };

  const shipMoney = () => {
    if (calTotalAmount(state) <= 10000000) {
      let ship = 100000;
      return ship;
    } else {
      let ship = 0;
      return ship;
    }
  };

  const handleAdd = (item) => {
    dispatch(addCart(item));
  };

  const handleDel = (item) => {
    dispatch(delCart(item));
  };

  const handleRemove = (item) => {
    dispatch(removeCart(item));
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
        <div className="box-item">
          <div className="box-item__info">
            <Link
              to={`/san-pham/${slugifyText(product.category)}/${slugifyText(
                product.product_name
              )}`}
            >
              <img
                className="box-item__image"
                src={product.image}
                alt="san pham"
              />
            </Link>
            <div>
              <p>
                {product.product_name} - {product.material}
              </p>
              <p>Kích thước : {product.size}</p>
              <div className="box-item__btn">
                <button
                  className="btn qty_btn"
                  onClick={() => handleDel(product)}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <div className="qty_input">{product.qty}</div>
                <button
                  className="btn qty_btn"
                  onClick={() => handleAdd(product)}
                  disabled={product.qty < product.qty_stock ? false : true}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
              <p>
                Giá:{" "}
                <span>
                  {Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </span>
              </p>
            </div>
          </div>

          <div className="btn-remove" onClick={() => handleRemove(product)}>
            <span>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
        </div>
        <hr />
      </div>
    );
  };

  const buttons = () => {
    return (
      <div className="cart-box cart-layout">
        <div className="total-price">
          Tổng tiền :
          <span>
            {" "}
            {Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(calTotalAmount(state) + shipMoney() - dataVoucher2)}
          </span>
        </div>
        <div className="group-btn">
          <button className="btn ">Đặt hàng ngay</button>
          <Link to={"/san-pham"}>
            <button className="btn">Tiếp tục mua hàng</button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="cart">
      <h2>GIỎ HÀNG</h2>

      {state.length === 0 ? (
        emptyCart()
      ) : (
        <div className="box-price">
          <div className="box-price-left">
            <div className="voucher">
              <input
                type="text"
                placeholder="Bạn có mã giảm giá?"
                onChange={(e) => setDataVoucher(e.target.value)}
              />
              <button className="voucher-btn" onClick={handleClick}>
                Nhập
              </button>
            </div>
            {state.length !== 0 && state.map(cartItems)}
          </div>
          <div className="cart-bill">
            <h3>Tóm tắt đơn hàng</h3>
            <p>
              Thành tiền :{" "}
              <span>
                {Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "VND",
                }).format(calTotalAmount(state))}
              </span>
            </p>
            <p>
              Phí vận chuyển:{" "}
              {calTotalAmount(state) > 10000000 ? (
                <span className="ship-money">Free Ship</span>
              ) : (
                <span>
                  {Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  }).format(shipMoney())}
                </span>
              )}
              <br />
              <small>( Miễn phí vận chuyển với đơn hàng trên 10 triệu )</small>
            </p>
            <p>
              Giảm giá từ Voucher :&nbsp;
              <span className="ship-money">
                {Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "VND",
                }).format(dataVoucher2)}
              </span>
            </p>
            <p>
              Thông tin vận chuyển: Sản phẩm sẽ được Hoàng Hoan giao trong vòng
              2-7 ngày. Chi tiết liên hệ{" "}
              <a href="tel:+1234567789">+123456789</a>
            </p>
            {state.length !== 0 && buttons()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
