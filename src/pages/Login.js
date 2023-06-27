import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import request from "../api/request";

function Login() {
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    request
      .get(`user?username=${username}&password=${password}`)
      .then((res) => {
        if (res.data.length > 0) {
          let user = res.data[0];
          if (user.password === password) {
            toast.success("Đăng nhập thành công");
            history("/");
          } else {
            toast.error("Tên người dùng hoặc mật khẩu không chính xác");
          }
        } else {
          toast.error("Tên người dùng hoặc mật khẩu không chính xác");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="box-content">
        <div className="banner-page">
          <div className="banner-page__image">
            <img src="images/AnhCatTC/LIENHE.jpg" alt="đối tác" />
          </div>
          <div className="banner-page__title">
            <img src="images/AnhCatTC/logo3.png" alt="logo" />
            <p>ĐĂNG NHẬP</p>
          </div>
        </div>
        <div className="wrapper-box box-contact">
          <div className="row">
            <div className="col-md-6">
              <div className="thumbnail h-100">
                <img
                  src="images/AnhCat/sp2.jpg"
                  alt="anh lien he"
                  className="h-100 w-100"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="thumbnail">
                <p>chào mừng bạn đến với nội thất hoàng hoan</p>
                <form className="form" id="form" onSubmit={handleLogin}>
                  <div className="form-contact">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="username">Tên đăng nhập</label>
                  </div>
                  <div className="form-contact">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Mật khẩu</label>
                    <button
                      type="button"
                      className="show-pass"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <i className="fa-regular fa-eye"></i>
                      ) : (
                        <i className="fa-regular fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                  <button className="box-contact__btn login" type="submit">
                    Đăng nhập
                  </button>
                  <hr />
                  <Link to={"/dang-ky-tai-khoan"}>
                    <button className="box-contact__btn">Đăng ký</button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
