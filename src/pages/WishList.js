import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StarRate from "../components/StarRate";
import slugifyText from "../utils/slugifyText";
import { removeWishlist } from "../redux/action";

function WishList() {
  const state = useSelector((state) => state.handleWishlist);
  const dispatch = useDispatch();
  const removeList = (product) => {
    dispatch(removeWishlist(product));
  };
  return (
    <>
      <div className="box-content all-product wishlist-product">
        <div className="all-product__item">
          <div className="all-product__item--title">
            <h4>Danh sách sản phẩm yêu thích ( {state.length} sản phẩm )</h4>
          </div>
          <div className="row">
            {state.map((product) => (
              <div className="col-md-3" key={product.id}>
                <div className="product-card">
                  <img
                    src={product.image}
                    alt="san pham"
                    className="product-card__image"
                  />

                  <div className="product-card__content">
                    <span className="title">
                      {product.product_name} <br />
                    </span>
                    {<StarRate value={product.Rating} />}
                    <br />
                    <span className="old-price">
                      {Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.old_price)}
                    </span>
                    <br />
                    <span className="new-price">
                      {Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </span>
                  </div>
                  <div className="product-card__group-btn">
                    <Link
                      to={`/san-pham/${slugifyText(
                        product.category
                      )}/${slugifyText(product.product_name)}`}
                    >
                      <button className="btn">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </Link>
                    <button className="btn" onClick={() => removeList(product)}>
                      <i className="fa-solid fa-heart-crack"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
