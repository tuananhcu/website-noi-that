import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  useEffect(() => {
    document.title = "Liên hệ với chúng tôi";
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    // Kiểm tra định dạng số điện thoại
    const phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (!phonePattern.test(formData.phone)) {
      formIsValid = false;
      formErrors.phone = "Số điện thoại không hợp lệ";
    }
    setErrors(formErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Thông tin không hợp lệ. Hãy nhập lại!");
      return;
    } else {
      toast.success("Gửi thành công");
      history("/");
    }
  };

  return (
    <div className="box-content">
      <div className="banner-page">
        <div className="banner-page__image">
          <img src="images/AnhCatTC/LIENHE.jpg" alt="đối tác" />
        </div>
        <div className="banner-page__title">
          <img src="images/AnhCatTC/logo3.png" alt="logo" />
          <p>LIÊN HỆ</p>
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
              <p>liên hệ với chúng tôi</p>
              <form className="form" id="form" onSubmit={handleSubmit}>
                <div className="form-contact">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="username">Họ tên</label>
                </div>
                <div className="form-contact">
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                  <small>{errors.email}</small>
                </div>
                <div className="form-contact">
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="phone">Số điện thoại</label>
                  <small>{errors.phone}</small>
                </div>
                <div className="form-contact">
                  <input
                    id="description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="description">Nội dung</label>
                </div>
                <button type="submit" className="box-contact__btn">
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
