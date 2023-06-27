import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import request from "../api/request";

function Login() {
  useEffect(() => {
    document.title = "Đăng ký";
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;

    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      formIsValid = false;
      formErrors.email = "Email không hợp lệ";
    }
    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 6) {
      formIsValid = false;
      formErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    // Kiểm tra nhập lại mật khẩu
    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      formErrors.confirmPassword = "Mật khẩu không khớp";
    }
    setErrors(formErrors);
    return formIsValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Thông tin không hợp lệ. Hãy nhập lại!");
      return;
    }
    // Kiểm tra tên người dùng đã tồn tại hay chưa
    request
      .get(`user?username=${formData.username}`)
      .then((res) => {
        // Xử lý kết quả từ Mock API
        if (res.data.length > 0) {
          toast.error("Tên người dùng đã tồn tại");
        } else {
          // Gửi yêu cầu đăng ký đến Mock API
          request
            .post("user", formData)
            .then((res) => {
              console.log(res.data);
              toast.success("Đăng ký tài khoản thành công!");
              history("/dang-nhap");
            })
            .catch((error) => {
              console.log(error);
              toast.error("Đã xảy ra lỗi!!!");
            });
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
            <p>ĐĂNG KÝ</p>
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
                <p>Đăng ký tài khoản</p>
                <form className="form" id="form" onSubmit={handleLogin}>
                  <div className="form-contact">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="username">Tên đăng nhập</label>
                  </div>
                  <div className="form-contact">
                    <input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <small>{errors.email}</small>
                  <div className="form-contact">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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
                  <small>{errors.password}</small>
                  <div className="form-contact">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                  </div>
                  <small>{errors.confirmPassword}</small>
                  <div>
                    <button className="box-contact__btn login" type="submit">
                      Đăng ký
                    </button>
                  </div>
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
