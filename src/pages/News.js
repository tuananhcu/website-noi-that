import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../api/request";
import slugifyText from "../utils/slugifyText";
import Loading from "../components/Loading";

function News() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Tin tức";

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

  var newData = [...data].sort((a, b) => b.create_date - a.create_date);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="box-news">
          <div id="map-link-bar">
            <ul>
              <li>
                <Link to={"/"}>Trang chủ</Link>
              </li>
              <li>
                <Link to={""}>Tin tức</Link>
              </li>
            </ul>
          </div>
          <div className="box-news__content">
            {newData.length !== 0 && (
              <div className="row">
                <div className="col-md-7 content-left">
                  <Link to={`/tin-tuc/${slugifyText(newData[0].title)}`}>
                    <div className="thumbnail">
                      <p className="content-left__title">{newData[0].title}</p>
                      <p>{newData[0].content}</p>
                      <img src={newData[0].image} alt="" />
                    </div>
                  </Link>
                </div>
                <div className="col-md-5 content-right">
                  <div className="thumbnail">
                    <div className="row ">
                      <div className="col-md-12">
                        <h4>bài viết mới</h4>
                      </div>
                    </div>
                    {newData.slice(1, 4).map((item) => (
                      <div className="row fix-height" key={item.id}>
                        <div className="col-md-5">
                          <Link to={`/tin-tuc/${slugifyText(item.title)}`}>
                            <img src={item.image} alt="tin tức" />
                          </Link>
                        </div>
                        <div className="col-md-7">
                          <p className="content-right__title">
                            <Link to={`/tin-tuc/${slugifyText(item.title)}`}>
                              {item.title}
                            </Link>
                          </p>
                          <p>
                            <i className="fa-regular fa-clock"></i>&nbsp;
                            {new Date(item.create_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default News;
