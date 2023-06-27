import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import request from "../api/request";
import {
  addCart,
  addOne,
  delCart,
  removeCart,
  toggleWishlist,
  toggleSelected,
} from "../redux/action";
import Loading from "../components/Loading";
import Gallery from "../components/Gallery";
import ProductCard from "../components/ProductCard";
import slugifyText from "../utils/slugifyText";
import formatCurrency from "../utils/formatCurrency";

export default function Product() {
  const { productName } = useParams();
  const [product, setProduct] = useState([]);
  const [productSame, setProductSame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [material, setMaterial] = useState("");
  const [toggleState, setToggleState] = useState(1);
  const [showPopupCart, setShowPopupCart] = useState(false);

  const state = useSelector((state) => state.handleCart);

  const checkWishlist = useSelector((state) => state.handleWishlist).find(
    (x) => slugifyText(x.product_name) === productName
  );
  const dispatch = useDispatch();

  const history = useNavigate();

  const popupRef = useRef(null);

  const addList = (product) => {
    dispatch(toggleWishlist(product));
  };

  const handleProductSelection = (item) => {
    dispatch(toggleSelected(item));
  };

  const addProduct = (product) => {
    let newItem = {
      ...product,
      material: material,
      qty: 1,
      isSelected: true,
    };
    dispatch(addCart(newItem));
  };

  const handleAddProduct = (product) => {
    if (material) {
      addProduct(product);
      setShowPopupCart(true);
    } else {
      toast.error("Vui lòng chọn chất liệu cho sản phẩm !");
    }
  };

  const handleIncrease = (product) => {
    dispatch(addOne(product));
  };

  const handleDel = (product) => {
    dispatch(delCart(product));
  };

  const handleRemove = (product) => {
    dispatch(removeCart(product));
  };

  const handleCheckOut = () => {
    if (totalCart) {
      history("/thanh-toan");
    } else {
      toast.error("Hãy chọn ít nhất 1 sản phẩm để tiến hành đặt hàng!");
    }
  };

  useEffect(() => {
    document.title = productName.replace(/-/g, " ");
    setLoading(true);
    const getProduct = async () => {
      try {
        const res = await request.get("product");
        setProduct(
          res.data.filter((x) => slugifyText(x.product_name) === productName)
        );
        setProductSame(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopupCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let data = productSame.filter(
    (x) => x.category === product[0].category && x.id !== product[0].id
  );

  let totalCart = state
    .filter((item) => item.isSelected === true)
    .reduce((acc, cur) => acc + cur.qty * cur.price, 0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const ShowProduct = () => {
    return (
      <div className="box-content all-product">
        {product.map((product) => (
          <div className="product-detail" key={product.id}>
            <div id="map-link-bar">
              <ul>
                <li>
                  <Link to={"/"}>Trang chủ</Link>
                </li>
                <li>
                  <Link to={`/${slugifyText(product.category)}`}>
                    {product.category}
                  </Link>
                </li>
                <li>
                  <Link to={""}>{product.product_name}</Link>
                </li>
              </ul>
            </div>
            <div className="box-product-detail">
              <div className="box-name">
                <p className="name-product">{product.product_name}</p>
                <div className="wishlist-effect">
                  <i
                    className={
                      checkWishlist ? "fi fi-sr-heart" : "fi fi-br-heart"
                    }
                    onClick={() => {
                      addList(product);
                    }}
                  ></i>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  {<Gallery image={product.img_slide} />}
                </div>
                <div className="col-md-5 box-price">
                  <div className="group-material">
                    <p>Chất liệu :</p>
                    {product.material.map((item, index) => (
                      <button
                        key={index}
                        className={
                          item.quantity > 0 ? "material" : "material disabled"
                        }
                        onClick={() => {
                          setMaterial(item.name);
                        }}
                        disabled={item.quantity > 0 ? false : true}
                      >
                        <span>{item.name}</span>
                        <img
                          src="../../images/select-pro.png"
                          alt=""
                          className={`option-material ${
                            material === item.name ? "" : "not-selected"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p>Kích thước : {product.size}</p>
                  <p>Màu sắc : {product.color}</p>
                  <div>
                    <span className="old-price">
                      {formatCurrency(product.old_price)}
                    </span>

                    <span className="sale">
                      {Math.round(
                        ((product.price - product.old_price) /
                          product.old_price) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <p className="new-price">{formatCurrency(product.price)}</p>
                  <div className="status-product">
                    Tình trạng :
                    {product.material.some((item) => item.quantity > 0) ? (
                      <span className="stocking"> Còn hàng</span>
                    ) : (
                      <span className="out-stock"> Hết hàng</span>
                    )}
                  </div>
                  <div className="warranty">
                    <img src="../../images/AnhCatTC/BAOHANH.jpg" alt="" />
                    <p>Bảo hành lên đến 36 tháng</p>
                  </div>
                  <div className="link-cart">
                    <button
                      className="btn"
                      onClick={() => {
                        handleAddProduct(product);
                      }}
                      disabled={
                        product.material.some((item) => item.quantity > 0)
                          ? false
                          : true
                      }
                    >
                      <i className="fi fi-br-shopping-cart-add"></i>
                      <span>Thêm vào giỏ</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="container mt-3" style={{ maxWidth: "100%" }}>
                <br />
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <div
                      className={
                        toggleState === 1 ? "nav-link active" : "nav-link"
                      }
                      onClick={() => toggleTab(1)}
                    >
                      Đặc trưng
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        toggleState === 2 ? "nav-link active" : "nav-link"
                      }
                      onClick={() => toggleTab(2)}
                    >
                      Thông số
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        toggleState === 3 ? "nav-link active" : "nav-link"
                      }
                      onClick={() => toggleTab(3)}
                    >
                      Bảo quản
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        toggleState === 4 ? "nav-link active" : "nav-link"
                      }
                      onClick={() => toggleTab(4)}
                    >
                      Bảo hành
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        toggleState === 5 ? "nav-link active" : "nav-link"
                      }
                      onClick={() => toggleTab(5)}
                    >
                      Cam kết
                    </div>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    id="menu1"
                    className={
                      toggleState === 1
                        ? "container tab-pane active"
                        : "container tab-pane fade"
                    }
                  >
                    <br />
                    <p>
                      {product.details.des1}
                      <br />
                    </p>
                  </div>
                  <div
                    id="menu2"
                    className={
                      toggleState === 2
                        ? "container tab-pane active"
                        : "container tab-pane fade"
                    }
                  >
                    <br />
                    <p>{product.details.des2}</p>
                  </div>
                  <div
                    id="menu3"
                    className={
                      toggleState === 3
                        ? "container tab-pane active"
                        : "container tab-pane fade"
                    }
                  >
                    <br />
                    <p>{product.details.des3}</p>
                  </div>
                  <div
                    id="menu4"
                    className={
                      toggleState === 4
                        ? "container tab-pane active"
                        : "container tab-pane fade"
                    }
                  >
                    <br />
                    <p>{product.details.des4}</p>
                  </div>
                  <div
                    id="menu5"
                    className={
                      toggleState === 5
                        ? "container tab-pane active"
                        : "container tab-pane fade"
                    }
                  >
                    <br />
                    <p>{product.details.des5}</p>
                  </div>
                </div>
              </div>
            </div>
            {showPopupCart && (
              <div className="backdrop show">
                <div className="popup-cart" ref={popupRef}>
                  {state.length !== 0 ? (
                    <div>
                      <div>
                        <div className="popup-cart__header">
                          <div>
                            <span>
                              <i className="fi fi-br-check-circle"></i>
                            </span>
                            Bạn đã thêm {product.product_name} {material} vào
                            giỏ hàng
                          </div>
                          <button
                            className="close-popup"
                            onClick={() => setShowPopupCart(false)}
                          >
                            <i className="fi fi-br-circle-xmark"></i>
                          </button>
                        </div>
                      </div>
                      <div className="popup-cart__qty">
                        <Link to={"/gio-hang"}>
                          <span>
                            <i className="fi fi-br-shopping-bag"></i>
                          </span>
                          Giỏ hàng của bạn có&nbsp;
                          {state.reduce((acc, cur) => acc + cur.qty, 0)} sản
                          phẩm
                        </Link>
                      </div>

                      <div className="box-product">
                        <table>
                          <tbody>
                            <tr>
                              <td></td>
                              <td className="san-pham">Sản phẩm</td>
                              <td className="so-luong">Số lượng</td>
                              <td className="don-gia">Đơn giá</td>
                              <td className="thanh-tien">Thành tiền</td>
                            </tr>
                            {state.map((item, index) => (
                              <tr key={index} className="popup-cart__product">
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={item.isSelected}
                                    onChange={() =>
                                      handleProductSelection(item)
                                    }
                                  />
                                </td>
                                <td>
                                  <div className="name">
                                    <Link
                                      to={`/${slugifyText(
                                        item.category
                                      )}/${slugifyText(item.product_name)}`}
                                    >
                                      <img
                                        className="box-item__image"
                                        src={`../../${item.image}`}
                                        alt="san pham"
                                      />
                                    </Link>
                                    <div>
                                      <div>
                                        {item.product_name} - {item.material}
                                      </div>
                                      <button
                                        className="remove"
                                        onClick={() => handleRemove(item)}
                                      >
                                        <i className="fa-solid fa-xmark"></i>
                                        <small>Bỏ sản phẩm</small>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="box-item__btn">
                                    <button
                                      className="btn qty_btn btn-left"
                                      onClick={() => handleDel(item)}
                                      disabled={item.qty > 1 ? false : true}
                                    >
                                      <i className="fa fa-minus"></i>
                                    </button>
                                    <div className="qty_input">{item.qty}</div>
                                    <button
                                      className="btn qty_btn btn-right"
                                      onClick={() => handleIncrease(item)}
                                    >
                                      <i className="fa fa-plus"></i>
                                    </button>
                                  </div>
                                </td>
                                <td>{formatCurrency(item.price)}</td>
                                <td className="thanh-tien-detail">
                                  {formatCurrency(item.qty * item.price)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="ship">
                        <div>Giao hàng trên toàn quốc</div>
                        <div>
                          Tổng tiền :&nbsp;
                          {formatCurrency(totalCart)}
                        </div>
                      </div>
                      <Link to={"/san-pham"}>
                        Tiếp tục mua hàng
                        <span className="buy-more">
                          <i className="fa-solid fa-caret-right"></i>
                        </span>
                      </Link>
                      <div className="popup-cart__btn">
                        <button onClick={handleCheckOut}>
                          Tiến hành đặt hàng
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="popup-empty">
                      <div className="remove">
                        <button
                          className="popup-empty__btn"
                          onClick={() => setShowPopupCart(false)}
                        >
                          <i className="fi fi-br-circle-xmark"></i>
                        </button>
                      </div>
                      <h3>Chưa có sản phẩm nào trong giỏ hàng</h3>
                      <Link to={"/san-pham"}>
                        <div className="popup-cart__btn">
                          <button>Tiếp tục mua sắm</button>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="all-product__item">
          <div className="all-product__item--title">
            <h4>Sản phẩm tương tự</h4>
          </div>
          <div className="row">
            {data.slice(0, 4).map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return <div>{loading ? <Loading /> : <ShowProduct />}</div>;
}
