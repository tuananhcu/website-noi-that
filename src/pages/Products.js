import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import request from "../api/request";
import slugifyText from "../utils/slugifyText";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const category = [
    "Phòng khách",
    "Phòng bếp",
    "Phòng ngủ",
    "Phòng tắm",
    "Trẻ em",
    "Văn phòng",
    "Cầu thang",
    "Đồ trang trí",
  ];

  useEffect(() => {
    document.title = "Tất cả sản phẩm";

    setLoading(true);
    const getProducts = async () => {
      try {
        const res = await request.get("product");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const ShowProducts = () => {
    return (
      <>
        {category.map((item, index) => (
          <div className="all-product__item" key={index}>
            <div className="all-product__item--title">
              <h4>{item}</h4>
              <Link to={`/san-pham/${slugifyText(item)}`} className="see-all">
                Xem tất cả
              </Link>
            </div>
            <div className="row">
              {data
                .filter((x) => x.category === item)
                .slice(0, 4)
                .map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="box-content all-product">
        <div id="demo" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to={0} className="active" />
            <li data-target="#demo" data-slide-to={1} />
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="../../images/AnhCatTC/trai-nghiem1.jpg"
                alt=""
                width={1100}
                height={500}
              />
              <div className="carousel-btn">
                <button className="btn-buy">Mua ngay</button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="../../images/AnhCatTC/banner.png"
                alt=""
                width={1100}
                height={500}
              />
            </div>
          </div>
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon" />
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon" />
          </a>
        </div>
        <>{loading ? <Loading /> : <ShowProducts />}</>
      </div>
    </>
  );
}

export default Products;
