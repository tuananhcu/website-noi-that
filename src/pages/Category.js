import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import request from "../api/request";
import slugifyText from "../utils/slugifyText";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

function Category() {
  const { productCategory } = useParams();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const sortOptions = ["Giá cao đến thấp", "Giá thấp đến cao"];
  const filterOptions = ["Dưới 5 triệu", "Từ 5 - 10 triệu", "Trên 10 triệu"];
  const [sortBy, setSortBy] = useState("Sắp xếp");
  const [priceRange, setPriceRange] = useState("");
  const [current, setCurrent] = useState();
  const [loading, setLoading] = useState(true);

  // Pagination
  const itemsPerPage = 4; // Số mục hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  // Tính toán số trang dựa trên tổng số mục và số mục trên mỗi trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // Lấy dữ liệu hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filter.slice(startIndex, endIndex);
  // Hàm xử lý khi chuyển đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    document.title = productCategory.replace(/-/g, " ");

    const getProducts = async () => {
      try {
        const res = await request.get("product");
        setData(
          res.data.filter((x) => slugifyText(x.category) === productCategory)
        );
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

  const handleSortChange = (e) => {
    let selectedSortBy = e.target.title;
    setSortBy(selectedSortBy);
    sortProductsByPrice(selectedSortBy, priceRange);
  };

  const handlePriceRangeChange = (current) => {
    setPriceRange(current);
    sortProductsByPrice(sortBy, current);
  };

  const sortProductsByPrice = (sortBy, range) => {
    const sortedList = [...data];
    switch (range) {
      case "Dưới 5 triệu": {
        const filteredList = sortedList.filter((item) => item.price < 5000000);
        if (sortBy === "Giá thấp đến cao") {
          filteredList.sort((a, b) => a.price - b.price);
          setFilter(filteredList);
        } else if (sortBy === "Giá cao đến thấp") {
          filteredList.sort((a, b) => b.price - a.price);
          setFilter(filteredList);
        } else {
          setFilter(filteredList);
        }
        break;
      }
      case "Từ 5 - 10 triệu": {
        const filteredList = sortedList.filter(
          (item) => item.price >= 5000000 && item.price <= 10000000
        );
        if (sortBy === "Giá thấp đến cao") {
          filteredList.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Giá cao đến thấp") {
          filteredList.sort((a, b) => b.price - a.price);
        }
        setFilter(filteredList);
        break;
      }
      case "Trên 10 triệu": {
        const filteredList = sortedList.filter((item) => item.price > 10000000);
        if (sortBy === "Giá thấp đến cao") {
          filteredList.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Giá cao đến thấp") {
          filteredList.sort((a, b) => b.price - a.price);
        }
        setFilter(filteredList);
        break;
      }
      default: {
        if (sortBy === "Giá thấp đến cao") {
          sortedList.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Giá cao đến thấp") {
          sortedList.sort((a, b) => b.price - a.price);
        }
        setFilter(sortedList);
      }
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
                {sortBy}
              </button>
              <div
                className="dropdown-menu dropdown-menu-left"
                aria-labelledby="dropdownMenuButton"
              >
                {sortOptions.map((item, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={handleSortChange}
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
                      handlePriceRangeChange(v);
                    }}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="all-product__item--title">
            <h4>{productCategory.replace(/-/g, " ")}</h4>
          </div>
          <div className="row">
            {filter.length !== 0 ? (
              currentData.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))
            ) : (
              <p className="not-found-product">Không tìm thấy sản phẩm nào!</p>
            )}
          </div>
          {filter.length !== 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
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
