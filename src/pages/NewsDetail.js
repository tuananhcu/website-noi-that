import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../api/request";
import Loading from "../components/Loading";
import slugifyText from "../utils/slugifyText";

function NewsDetail() {
  const { newsTitle } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Tất cả tin tức";

    setLoading(true);
    const getNews = async () => {
      try {
        const res = await request.get("news");
        setData(res.data.filter((x) => slugifyText(x.title) === newsTitle));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getNews();
  }, [newsTitle]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="box-content all-news">
          {data.map((item) => (
            <div className="box-news__content news_detail" key={item.id}>
              <h4>{item.title}</h4>
              <img
                src={`../../${item.image}`}
                alt={""}
                className="news-detail__image"
              />
              <p className="news-detail__desc">{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default NewsDetail;
