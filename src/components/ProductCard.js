import React from "react";
import { Link } from "react-router-dom";

import StarRate from "./StarRate";
import slugifyText from "../utils/slugifyText";
import formatCurrency from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/action";

function ProductCard({ product }) {
  const checkWishlist = useSelector((state) => state.handleWishlist).find(
    (x) => x.product_name === product.product_name
  );

  const dispatch = useDispatch();

  const addList = (product) => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="col-md-3">
      <div className="product-card">
        <Link
          to={`/${slugifyText(product.category)}/${slugifyText(
            product.product_name
          )}`}
        >
          <img
            src={`../../${product.image}`}
            alt="san pham"
            className="product-card__image"
          />
          <div className="product-card__content">
            <span className="title">
              {product.product_name} <br />
            </span>
            {<StarRate value={product.rating} />}
            <br />
            <span className="old-price">
              {formatCurrency(product.old_price)}
            </span>
            <br />
            <span className="new-price">{formatCurrency(product.price)}</span>
          </div>
        </Link>
        <div className="flash-sale">
          <span>Giảm</span>
          <span>
            {Math.round(
              ((product.old_price - product.price) / product.old_price) * 100
            )}
            %
          </span>
        </div>
        <div className="add-wishlist">
          <button className="wishlist-btn" onClick={() => addList(product)}>
            <i
              className={checkWishlist ? "fi fi-sr-heart" : "fi fi-br-heart"}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
