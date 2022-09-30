import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const Contact = () => {
  const initialValues = { username: "", email: "", phone: "", description: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    document.title = "Liên hệ với chúng tôi";
    if (Object.keys(formError).length === 0 && isSubmit) {
      // console.log(formValues);
      toast.success("Gửi thành công");
    }
    if (Object.keys(formError).length !== 0 && isSubmit) {
      toast.error("Thông tin không chính xác. Hãy nhập lại");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formError]);

  const validate = (values) => {
    const errors = {};
    const regEmail =
      /(^[a-zA-Z0-9_]+[.]*[a-zA-Z0-9_]+[@][a-zA-Z]+[.][a-zA-Z]{2,4}$)|(^[a-zA-Z0-9]+[.]*[a-zA-Z0-9_]+(@)[a-zA-Z]+[.][a-zA-Z]{2,4}[.][a-zA-Z]{2}$)/i;
    const regPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if (!values.username) {
      errors.username = "Họ tên không được để trống !";
    }

    if (!values.email) {
      errors.email = "Email không được để trống !";
    } else if (!regEmail.test(values.email)) {
      errors.email = "Email không đúng định dạng !";
    }

    if (!values.phone) {
      errors.phone = "Số điện thoại không được để trống !";
    } else if (!regPhone.test(values.phone)) {
      errors.phone = "Số điện thoại không đúng định dạng !";
    }

    if (!values.description) {
      errors.description = "Nội dung không được để trống !";
    }
    return errors;
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
                    value={formValues.username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="username">Họ tên</label>
                  <small>{formError.username}</small>
                </div>
                <div className="form-contact">
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                  <small>{formError.email}</small>
                </div>
                <div className="form-contact">
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="phone">Số điện thoại</label>
                  <small>{formError.phone}</small>
                </div>
                <div className="form-contact">
                  <input
                    id="desc"
                    type="text"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="description">Nội dung</label>
                  <small>{formError.description}</small>
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
