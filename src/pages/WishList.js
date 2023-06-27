import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { toggleWishlist } from "../redux/action";
import slugifyText from "../utils/slugifyText";
import formatCurrency from "../utils/formatCurrency";

function WishList() {
  useEffect(() => {
    document.title = "Danh sách yêu thích";
  }, []);

  const state = useSelector((state) => state.handleWishlist);
  const dispatch = useDispatch();
  const removeList = (product) => {
    dispatch(toggleWishlist(product));
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
                      <span className="old-price">
                        {formatCurrency(product.old_price)}
                      </span>
                      <br />
                      <span className="new-price">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </Link>
                  <div style={{ textAlign: "center" }}>
                    <button
                      className="wishlist-remove"
                      onClick={() => removeList(product)}
                    >
                      Xóa
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
