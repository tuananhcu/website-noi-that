import React, { useState, useEffect } from "react";
import request from "../api/request";
import Loading from "../components/Loading";

function Partner() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Đối tác của chúng tôi";
    setLoading(true);
    const getData = async () => {
      try {
        const res = await request.get("partner");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="box-content">
          <div className="banner-page">
            <div className="banner-page__image">
              <img src="images/AnhCatTC/DOITAC.jpg" alt="đối tác" />
            </div>
            <div className="banner-page__title">
              <img src="images/AnhCatTC/logo3.png" alt="" />
              <p>ĐỐI TÁC</p>
            </div>
          </div>
          <div className="wrapper-box box-partner">
            {data.map((item) => (
              <div className="row" key={item.id}>
                <div className="col-md-4">
                  <div className="thumbnail">
                    <img src={item.image} alt="" />
                  </div>
                </div>
                <div className="col-md-8 content">
                  <div className="thumbnail">
                    <p className="title">{item.partner_name}</p>
                    <p className="desc">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Partner;
