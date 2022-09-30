import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import request from "../api/request";
import { toast } from "react-toastify";
import { addCart, addWishlist, removeWishlist } from "../redux/action";
import slugifyText from "../utils/slugifyText";
import Loading from "../components/Loading";
import Gallery from "../components/Gallery";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const { productName } = useParams();
  let [product, setProduct] = useState([]);
  let [productSame, setProductSame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [material, setMaterial] = useState(undefined);
  const [wishlist, setWishlist] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const state = useSelector((state) => state.handleWishlist);

  const check = () => {
    if (material !== undefined && product[0].qty_stock !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const dispatch = useDispatch();

  const addList = (product) => {
    dispatch(addWishlist(product));
    setWishlist(true);
  };

  const removeList = (product) => {
    dispatch(removeWishlist(product));
    setWishlist(false);
  };

  const addProduct = (product) => {
    if (product.qty_stock > 0) {
      if (check()) {
        let newItem = {
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          material: material,
          image: product.image,
          category: product.category,
          qty_stock: product.qty_stock,
          size: product.size,
        };
        toast.success("Đã thêm sản phẩm");
        dispatch(addCart(newItem));
        setMaterial(undefined);
      } else {
        toast.error("Vui lòng chọn chất liệu cho sản phẩm !");
      }
    } else {
      toast.error("Sản phẩm đã được bán hết !");
    }
  };

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const res = await request.get("product");
        setProduct(
          res.data.filter((x) => slugifyText(x.product_name) === productName)
        );
        setProductSame(res.data);
        setLoading(false);
        //check wishlist
        const check = state.find(
          (x) => slugifyText(x.product_name) === productName
        );
        if (check.length !== 0) {
          setWishlist(true);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  let data = productSame.filter(
    (x) => x.category === product[0].category && x.id !== product[0].id
  );

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const ShowProduct = () => {
    return (
      <div className="box-content all-product">
        {product.map((product) => {
          document.title = product.product_name;
          return (
            <div className="product-detail" key={product.id}>
              <div id="map-link-bar">
                <ul>
                  <li>
                    <Link to={"/"}>Trang chủ</Link>
                  </li>
                  <li>
                    <Link to={`/san-pham/${slugifyText(product.category)}`}>
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
                  {wishlist ? (
                    <div className="wishlist-effect">
                      <i
                        className="fa-solid fa-heart"
                        onClick={() => {
                          removeList(product);
                        }}
                      ></i>
                    </div>
                  ) : (
                    <div className="wishlist-effect">
                      <i
                        className="fa-regular fa-heart"
                        onClick={() => {
                          addList(product);
                        }}
                      ></i>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-7">
                    {<Gallery image={product.img_slide} />}
                  </div>
                  <div className="col-md-5 box-price">
                    <div className="group-material">
                      <p>Chất liệu :</p>
                      {(product.material || []).map((item, index) => (
                        <div
                          key={index}
                          className="material"
                          onClick={() => setMaterial(item)}
                        >
                          <span>{item}</span>
                          <img
                            src="../../images/select-pro.png"
                            alt=""
                            className={`option-material ${
                              material === item ? "" : "not-selected"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <p>Kích thước : {product.size}</p>
                    <p>Màu sắc : {product.color}</p>
                    <div>
                      <span className="old-price">
                        {Intl.NumberFormat("it-IT", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.old_price)}
                      </span>
                      {product.price !== null && (
                        <span className="sale">
                          -
                          {Math.round(
                            100 - (product.price / product.old_price) * 100
                          )}
                          %
                        </span>
                      )}
                    </div>
                    <p className="new-price">
                      {" "}
                      {Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </p>
                    <div className="status-product">
                      Tình trạng :{" "}
                      {product.qty_stock > 0 ? (
                        <span className="stocking">Còn hàng</span>
                      ) : (
                        <span className="out-stock">Hết hàng</span>
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
                          addProduct(product);
                        }}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          addProduct(product);
                        }}
                      >
                        <Link to={check() ? "/gio-hang" : ""} className="btn">
                          Mua ngay
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
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
            </div>
          );
        })}

        <div className="all-product__item">
          <div className="all-product__item--title">
            <h4>Sản phẩm tương tự</h4>
          </div>
          <div className="row">
            {/* .sort(() => 0.5 - Math.random()) */}
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
