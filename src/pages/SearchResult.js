import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import request from "../api/request";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

function SearchResult() {
  let [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortOptions = [
    "Giá thấp đến cao",
    "Giá cao đến thấp",
    "Theo độ nổi bật",
  ];

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let name = query.get("key");

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const res = await request.get("product", {
          params: {
            product_name: name,
          },
        });
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProduct();
  }, [name]);

  const handleSort = (e) => {
    let sortValue = e.target.value;
    let sortData = [...product];
    switch (sortValue) {
      case "Giá cao đến thấp":
        sortData.sort((a, b) => b.price - a.price);
        setProduct(sortData);
        break;
      case "Giá thấp đến cao":
        sortData.sort((a, b) => a.price - b.price);
        setProduct(sortData);
        break;
      case "Theo độ nổi bật":
        sortData.sort((a, b) => b.Rating - a.Rating);
        setProduct(sortData);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="box-content all-product search-product">
          {product.length === 0 ? (
            <div className="all-product__item">
              <div className="all-product__item--title">
                <h4>Không tìm thấy kết quả nào cho từ khóa "{name}"</h4>
              </div>
            </div>
          ) : (
            <div className="all-product__item">
              <div className="all-product__item--title search-product__title">
                <h4>Kết quả tìm kiếm cho từ khóa "{name}"</h4>
                <select
                  name="format"
                  id="format"
                  className="search-product__select"
                  onChange={handleSort}
                >
                  <option>Sắp xếp</option>
                  {sortOptions.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                {product.map((v) => (
                  <ProductCard product={v} key={v.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchResult;
