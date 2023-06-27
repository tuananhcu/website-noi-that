import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import request from "../api/request";
import Loading from "../components/Loading";
import slugifyText from "../utils/slugifyText";
import Pagination from "../components/Pagination";

function AllNews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const itemsPerPage = 3; // Số mục hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  // Tính toán số trang dựa trên tổng số mục và số mục trên mỗi trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // Lấy dữ liệu hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  // Hàm xử lý khi chuyển đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    document.title = "Tất cả tin tức";
    const getNews = async () => {
      try {
        const res = await request.get("news");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="box-content all-news">
          <div className="box-news__content">
            <h4>TẤT CẢ TIN TỨC</h4>
            <div className="row">
              {currentData.map((item) => (
                <div className="col-md-4 box-item" key={item.id}>
                  <img
                    src={item.image}
                    alt="tin tuc"
                    className="box-item__image"
                  />
                  <Link to={`/tin-tuc/${slugifyText(item.title)}`}>
                    <p className="box-item__title">{item.title}</p>
                  </Link>
                  <p className="box-item__desc">{item.content}</p>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AllNews;
