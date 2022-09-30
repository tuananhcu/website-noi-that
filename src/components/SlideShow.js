import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import request from "../api/request";
import Slider from "react-slick";
import StarRate from "./StarRate";
import slugifyText from "../utils/slugifyText";

function SlideShow() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

  const Loading = () => {
    return (
      <>
        <div className="loaded"></div>
        <p className="content-loaded">Đang tải . . .</p>
      </>
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          autoplay: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplay: false,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="slide-product">
      <h4>sản phẩm nổi bật</h4>
      {loading ? (
        <Loading />
      ) : (
        <Slider {...settings} className="slider">
          {data
            .filter((x) => x.Rating === 5)
            .map((item) => (
              <Link
                to={`/san-pham/${slugifyText(item.category)}/${slugifyText(
                  item.product_name
                )}`}
                key={item.id}
              >
                <div className="slider__image">
                  <img src={item.image} alt="" />
                  <div className="slider__content">
                    <div className="slider__content--title">
                      {item.product_name} <br />
                      <StarRate value={item.Rating} />
                    </div>
                    <span className="slider__content--old-price">
                      {Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.old_price)}
                    </span>
                    <br />
                    <span className="slider__content--new-price">
                      {" "}
                      {Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      )}
    </div>
  );
}

export default SlideShow;
