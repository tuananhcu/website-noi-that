import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <section id="footer">
        <div className="allInfo">
          <div className="info">
            <h5>thông tin chung</h5>
            <p>công ty tnhh hoàng hoan</p>
            <ul className="list-footer">
              <li>
                <div className="icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <a href="tel:0999.999.999">0999.999.999</a>
                </div>
              </li>
              <li>
                <div className="icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div>
                  <a href="mailto:cskh@hoanghoan.vn">cskh@hoanghoan.vn</a>
                </div>
              </li>
              <li>
                <div className="icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>Số 1 Nguyễn Trãi, Thanh Xuân, Hà Nội</div>
              </li>
            </ul>
          </div>
          <div className="info">
            <h5>về chúng tôi</h5>
            <ul className="list-footer">
              <li>
                <Link to={""}>Giới thiệu</Link>
              </li>
              <li>
                <Link to={""}>Sản phẩm</Link>
              </li>
              <li>
                <Link to={""}>Tin tức</Link>
              </li>
              <li>
                <Link to={""}>Đối tác</Link>
              </li>
              <li>
                <Link to={""}>Liên hệ</Link>
              </li>
            </ul>
          </div>
          <div className="info">
            <h5>kết nối với chúng tôi</h5>
            <div className="social">
              <Link to={""}>
                <img
                  src="../../images/iconFooter/icon_fb_pro.jpg"
                  alt="social images"
                />
              </Link>
              <Link to={""}>
                <img
                  src="../../images/iconFooter/icon_zalo_pro.jpg"
                  alt="social images"
                />
              </Link>
              <Link to={""}>
                <img
                  src="../../images/iconFooter/icon_email_pro.jpg"
                  alt="social images"
                />
              </Link>
            </div>
            <img src="../../images/iconFooter/chatluong.jpg" alt="chứng nhận" />
          </div>
        </div>
      </section>

      <div className="credit">
        Created by <span>Cu Tuan Anh </span> | all rights reserved
      </div>
    </>
  );
}

export default Footer;
