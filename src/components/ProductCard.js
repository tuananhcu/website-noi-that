import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StarRate from "./StarRate";
import slugifyText from "../utils/slugifyText";
import { addWishlist } from "../redux/action";

function ProductCard(props) {
  const dispatch = useDispatch();

  const addList = (product) => {
    dispatch(addWishlist(product));
  };
  const { product } = props;
  return (
    <div className="col-md-3">
      <div className="product-card">
        <img
          src={`../../${product.image}`}
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
            to={`/san-pham/${slugifyText(product.category)}/${slugifyText(
              product.product_name
            )}`}
          >
            <button className="btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </Link>
          <button className="btn" onClick={() => addList(product)}>
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
