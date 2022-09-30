import React from "react";
import { useState, useEffect, useRef } from "react";
import request from "../api/request";
import { useDebounce } from "../hooks";
import { Link } from "react-router-dom";
import slugifyText from "../utils/slugifyText";

function Search() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 600);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    const getProducts = async () => {
      try {
        const res = await request.get("product", {
          params: {
            product_name: searchValue,
          },
        });
        setSearchResult(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const inputRef = useRef();
  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  const handleLink = (e) => {
    if (!searchValue) {
      e.preventDefault();
    } else {
      setSearchValue("");
      setShowSearch(false);
    }
  };
  return (
    <>
      <div
        className={showSearch ? "icon active" : "icon"}
        onClick={() => {
          setShowSearch(!showSearch);
        }}
      >
        <i className="fi fi-bs-search"></i>
      </div>
      <div className={showSearch ? "search-form active" : "search-form"}>
        <input
          ref={inputRef}
          id="search"
          type="text"
          className="search-box"
          onChange={handleChange}
          value={searchValue}
          required
        />
        <label htmlFor="search">Bạn cần tìm sản phẩm gì?</label>
        {loading && (
          <div className="search-form__load">
            <i className="fa-solid fa-spinner"></i>
          </div>
        )}
        {!!searchValue && !loading && (
          <button className="search-form__clear">
            <i
              className="fa-sharp fa-solid fa-circle-xmark"
              onClick={handleClear}
            ></i>
          </button>
        )}
        <Link
          to={`/tim-kiem?key=${searchValue}`}
          className="search-form__search"
          onClick={handleLink}
          onMouseDown={(e) => e.preventDefault()}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
      </div>
      {showSearch && searchResult.length !== 0 && (
        <div className="data-search">
          {searchResult.slice(0, 4).map((value) => (
            <Link
              key={value.id}
              to={`/san-pham/${slugifyText(value.category)}/${slugifyText(
                value.product_name
              )}`}
              onClick={() => {
                setSearchValue("");
                setShowSearch(false);
              }}
            >
              <div className="data-search__item">
                <img src={`../../${value.image}`} alt="" />
                <p>{value.product_name}</p>
                <i className="fa-solid fa-angle-right"></i>
              </div>
            </Link>
          ))}
          {searchResult.length > 4 && (
            <div className="data-search__item">
              <Link
                to={`/tim-kiem?key=${searchValue}`}
                onClick={() => {
                  setSearchValue("");
                  setShowSearch(false);
                }}
              >
                Xem tất cả kết quả
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Search;
