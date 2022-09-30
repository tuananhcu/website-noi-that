import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import request from "../api/request";
import slugifyText from "../utils/slugifyText";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

function Category() {
  const { productCategory } = useParams();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([data]);
  const [dataSort, setDataSort] = useState([]);
  const sortOptions = ["Giá cao đến thấp", "Giá thấp đến cao", "Độ nổi bật"];
  const [sortOptionSelect, setSortOptionSelect] = useState("Sắp xếp");
  const [loading, setLoading] = useState(false);
  const filterOptions = ["Dưới 5 triệu", "Từ 5 - 10 triệu", "Trên 10 triệu"];
  const [current, setCurrent] = useState();
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    document.title = reName(productCategory);

    setLoading(true);
    const getProducts = async () => {
      try {
        const res = await request.get("product");
        setData(res.data);
        setFilter(
          res.data.filter((x) => slugifyText(x.category) === productCategory)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProducts();
  }, [productCategory]);

  const reName = (name) => {
    let title;
    switch (name) {
      case "phong-khach": {
        title = "Phòng khách";
        break;
      }
      case "phong-bep": {
        title = "Phòng bếp";
        break;
      }
      case "phong-tam": {
        title = "Phòng tắm";
        break;
      }
      case "tre-em": {
        title = "Trẻ em";
        break;
      }
      case "van-phong": {
        title = "Văn phòng";
        break;
      }
      case "cau-thang": {
        title = "Cầu thang";
        break;
      }
      case "do-trang-tri": {
        title = "Đồ trang trí";
        break;
      }
      default:
        break;
    }
    return title;
  };

  const loadMore = () => {
    setVisible((prev) => {
      return prev + 4;
    });
  };

  const handleClick = (current) => {
    let newArr = data.filter(
      (x) => slugifyText(x.category) === productCategory
    );
    switch (current) {
      case "Dưới 5 triệu":
        dataSort.length === 0
          ? setFilter(newArr.filter((x) => x.price < 5000000))
          : setFilter(dataSort.filter((x) => x.price < 5000000));
        break;
      case "Từ 5 - 10 triệu":
        dataSort.length === 0
          ? setFilter(
              newArr.filter((x) => x.price >= 5000000 && x.price <= 10000000)
            )
          : setFilter(
              dataSort.filter((x) => x.price >= 5000000 && x.price <= 10000000)
            );
        break;
      case "Trên 10 triệu":
        dataSort.length === 0
          ? setFilter(newArr.filter((x) => x.price > 10000000))
          : setFilter(dataSort.filter((x) => x.price > 10000000));
        break;
      default:
        break;
    }
  };

  const handleClickSort = (e) => {
    setCurrent();
    let sortValue = e.target.title;
    setSortOptionSelect(sortValue);
    let newArr = data.filter(
      (x) => slugifyText(x.category) === productCategory
    );

    switch (sortValue) {
      case "Giá thấp đến cao":
        newArr.sort((a, b) => a.price - b.price);
        setFilter(newArr);
        setDataSort(newArr);
        break;
      case "Giá cao đến thấp":
        newArr.sort((a, b) => b.price - a.price);
        setFilter(newArr);
        setDataSort(newArr);
        break;
      case "Độ nổi bật":
        newArr.sort((a, b) => b.Rating - a.Rating);
        setFilter(newArr);
        setDataSort(newArr);
        break;
      default:
        break;
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="all-product__item">
          <div className="box-control">
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {sortOptionSelect}
              </button>
              <div
                className="dropdown-menu dropdown-menu-left"
                aria-labelledby="dropdownMenuButton"
              >
                {sortOptions.map((item, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={handleClickSort}
                    title={item}
                  >
                    <span />
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="group-filter">
              {filterOptions.map((v, index) => {
                return (
                  <div
                    key={index}
                    className={`filter-item ${current === v ? "active" : ""}`}
                    onClick={() => {
                      setCurrent(v);
                      handleClick(v);
                    }}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="all-product__item--title">
            <h4>{reName(productCategory)}</h4>
          </div>
          <div className="row">
            {Object.keys(filter).length !== 0 ? (
              filter
                .slice(0, visible)
                .map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))
            ) : (
              <p className="not-found-product">Không tìm thấy sản phẩm nào!</p>
            )}
          </div>
          {visible < filter.length && (
            <div className="load-more">
              <button
                onClick={loadMore}
                type="button"
                className="load-more__btn"
              >
                Xem thêm
              </button>
            </div>
          )}
        </div>
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
          </div>
        </div>
        <>{loading ? <Loading /> : <ShowProducts />}</>
      </div>
    </>
  );
}

export default Category;
