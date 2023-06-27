import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Search from "./Search";

function Header() {
  const state = useSelector((state) => state.handleCart);
  const state2 = useSelector((state) => state.handleWishlist);
  const [showScroll, setShowScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleScroll = () => {
    setShowNav(false);
    if (window.scrollY > 60) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      <div className="header">
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
          <div className="icon" title="Giỏ hàng">
            <Link to="/gio-hang">
              <i className="fi fi-br-shopping-bag"></i>
            </Link>
            {state.length === 0 ? "" : <div className="qty">{totalCart}</div>}
          </div>
          <div className="icon" title="Yêu thích">
            <Link to="/danh-sach-yeu-thich">
              <i className="fi fi-br-heart"></i>
            </Link>
            {state2.length === 0 ? (
              ""
            ) : (
              <div className="qty">{state2.length}</div>
            )}
          </div>
          {<Search />}
          <div className="icon" title="Đăng nhập">
            <Link to={"/dang-nhap"}>
              <i className="fi fi-br-user"></i>
            </Link>
          </div>
          <div id="menu-bar" onClick={() => setShowNav(!showNav)}>
            <i
              className={showNav ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            ></i>
          </div>
        </div>
      </div>

      <button
        id="scroll-top"
        onClick={scrollToTop}
        className={showScroll ? "active" : ""}
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}

export default Header;
