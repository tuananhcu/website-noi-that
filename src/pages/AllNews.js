import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import request from "../api/request";
import Loading from "../components/Loading";
import slugifyText from "../utils/slugifyText";

function AllNews() {
  document.title = "Tất cả tin tức";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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
              {data.map((item) => (
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
          </div>
        </div>
      )}
    </>
  );
}

export default AllNews;
