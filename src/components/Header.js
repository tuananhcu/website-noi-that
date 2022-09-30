import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";
import slugifyText from "../utils/slugifyText";

function Header() {
  const state = useSelector((state) => state.handleCart);
  const state2 = useSelector((state) => state.handleWishlist);
  const [showScroll, setShowScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      setShowNav(false);
      if (window.scrollY > 60) {
        setFixed(true);
        setShowScroll(true);
      } else {
        setFixed(false);
        setShowScroll(false);
      }
    };
  }, []);

  let totalCart = 0;
  state.forEach((item) => {
    totalCart += item.qty;
  });

  const activeClassName = ({ isActive }) => {
    return isActive ? "link active" : "link";
  };

  return (
    <>
      <div className={fixed ? "header fixed" : "header"}>
        <Link to="/">
          <img className="logo" src="../../images/AnhCat/logo.jpg" alt="logo" />
        </Link>
        <nav className={showNav ? "navbar active" : "navbar"}>
          <NavLink to={"/"} className={activeClassName}>
            trang chủ
          </NavLink>
          <NavLink to={"/gioi-thieu"} className={activeClassName}>
            giới thiệu
          </NavLink>
          <NavLink to={"/san-pham"} className={activeClassName}>
            sản phẩm
          </NavLink>
          <NavLink to={"/tin-tuc"} className={activeClassName}>
            tin tức
          </NavLink>
          <NavLink to={"/doi-tac"} className={activeClassName}>
            đối tác
          </NavLink>
          <NavLink to={"/lien-he"} className={activeClassName}>
            liên hệ
          </NavLink>
        </nav>
        <div className="group-icon">
          <div className="icon icon-cart">
            <Link to="/gio-hang">
              <i className="fi fi-bs-shopping-bag"></i>
            </Link>
            {state.length === 0 ? "" : <div className="qty">{totalCart}</div>}
            <div className="box box-cart">
              {state.length === 0 ? (
                <div className="box__empty">
                  <p className="box__title">Giỏ hàng của bạn đang trống !</p>
                  <Link to={"/san-pham"}>
                    <div className="check__btn">Mua hàng ngay</div>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="box__title">Giỏ hàng của bạn</div>
                  <div className="box__content">
                    {state.map((item, index) => (
                      <div key={index}>
                        <Link
                          to={`/san-pham/${slugifyText(
                            item.category
                          )}/${slugifyText(item.product_name)}`}
                        >
                          <div className="box__content--data">
                            <div className="details">
                              <img src={`../../${item.image}`} alt={""} />
                              <div>
                                <h5>{item.product_name}</h5>
                                <h5>Chất liệu : {item.material}</h5>
                              </div>
                            </div>
                            <h5>
                              <span>
                                {Intl.NumberFormat("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.price)}
                              </span>
                            </h5>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="check">
                    <p>( {totalCart} sản phẩm )</p>
                    <Link to={"/gio-hang"} className="check__btn">
                      Xem chi tiết
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="icon icon-wishlist">
            <Link to="/danh-sach-yeu-thich">
              <i className="fi fi-bs-heart"></i>
            </Link>
            {state2.length === 0 ? (
              ""
            ) : (
              <div className="qty">{state2.length}</div>
            )}
            <div className="box box-wishlist">
              {state2.length === 0 ? (
                <div className="box__empty">
                  <p className="box__title">Danh sách yêu thích trống !</p>
                  <Link to={"/san-pham"}>
                    <div className="check__btn">Xem thêm sản phẩm</div>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="box__title">Danh sách yêu thích</div>
                  <div className="box__content">
                    {state2.map((item, index) => (
                      <div key={index}>
                        <Link
                          to={`/san-pham/${slugifyText(
                            item.category
                          )}/${slugifyText(item.product_name)}`}
                        >
                          <div className="box__content--data">
                            <div className="details">
                              <img src={`../../${item.image}`} alt={""} />
                              <div>
                                <h5>{item.product_name}</h5>
                                <h5>
                                  {item.Rating}&nbsp;
                                  <i className="fa-solid fa-star"></i>
                                </h5>
                              </div>
                            </div>
                            <h5>
                              <span>
                                {Intl.NumberFormat("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.price)}
                              </span>
                            </h5>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="check">
                    <p>( {state2.length} sản phẩm )</p>
                    <Link to={"/danh-sach-yeu-thich"} className="check__btn">
                      Xem chi tiết
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          {<Search />}
          <div id="menu-bar" onClick={() => setShowNav(!showNav)}>
            <i
              className={showNav ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            ></i>
          </div>
        </div>
      </div>

      <button
        id="scroll-top"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        className={showScroll ? "active" : ""}
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}

export default Header;
