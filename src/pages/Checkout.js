import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { payCart } from "../redux/action";
import Loading from "../components/Loading";
import formatCurrency from "../utils/formatCurrency";

function Checkout() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voucherCode, setVoucherCode] = useState("");
  const [showVoucher, setShowVoucher] = useState("");
  const [dataVoucher, setDataVoucher] = useState(0);
  const [checkVoucher, setCheckVoucher] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const voucherList = [
    { amount: 1000000, code: "VOUCHER1" },
    { amount: 200000, code: "VOUCHER2" },
    { amount: 500000, code: "VOUCHER3" },
  ];

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    payment: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;
    // Kiểm tra tên
    if (formData.username.trim() === "") {
      formIsValid = false;
      formErrors.username = "Họ và tên không được để trống";
    }
    // Kiểm tra định dạng số điện thoại
    const phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (formData.phone.trim() === "") {
      formIsValid = false;
      formErrors.phone = "Số điện thoại không được để trống";
    } else if (!phonePattern.test(formData.phone)) {
      formIsValid = false;
      formErrors.phone = "Số điện thoại không hợp lệ";
    }
    // Kiểm tra địa chỉ
    if (formData.city.trim() === "") {
      formIsValid = false;
      formErrors.city = "Vui lòng chọn tỉnh / thành phố";
    }
    if (formData.district.trim() === "") {
      formIsValid = false;
      formErrors.district = "Vui lòng chọn quận / huyện";
    }
    if (formData.ward.trim() === "") {
      formIsValid = false;
      formErrors.ward = "Vui lòng chọn phường / xã";
    }
    // Kiểm tra phương thức thanh toán
    if (formData.payment.trim() === "") {
      formIsValid = false;
      formErrors.payment = "Vui lòng chọn phương thức thanh toán";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    document.title = "Thanh toán";
    const getProvince = async () => {
      try {
        const res = await axios.get(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProvince();
  }, []);

  const history = useNavigate();

  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      city: e.target.value,
      district: "",
      ward: "",
    });
  };

  const renderDistrictOptions = () => {
    if (formData.city === "") {
      return <option value="">Quận / Huyện</option>;
    } else {
      const districts = data.find(
        (city) => city.name === formData.city
      ).districts;
      return (
        <>
          <option value="">Quận / Huyện</option>
          {districts.map((district) => (
            <option value={district.name} key={district.name}>
              {district.name}
            </option>
          ))}
        </>
      );
    }
  };

  const renderWardOptions = () => {
    if (formData.district === "") {
      return <option value="">Phường / Xã</option>;
    } else {
      const wards = data
        .find((city) => city.name === formData.city)
        .districts.find(
          (district) => district.name === formData.district
        ).wards;
      return (
        <>
          <option value="">Phường / Xã</option>
          {wards.map((ward) => (
            <option value={ward.name} key={ward.name}>
              {ward.name}
            </option>
          ))}
        </>
      );
    }
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => state.handleCart).filter(
    (item) => item.isSelected
  );

  let calTotalAmount = state
    .filter((item) => item.isSelected === true)
    .reduce((acc, cur) => acc + cur.qty * cur.price, 0);

  let shipMoney = calTotalAmount <= 10000000 ? 100000 : 0;

  const handleClick = () => {
    setCheckVoucher(true);
    setTimeout(() => {
      let enteredVoucher = voucherList.find(
        (voucher) => voucher.code === voucherCode.trim().toUpperCase()
      );
      if (enteredVoucher) {
        toast.success("Nhập mã voucher thành công");
        setShowVoucher(enteredVoucher.code);
        setDataVoucher(enteredVoucher.amount);
      } else {
        toast.error("Mã giảm giá không đúng hoặc đã hết !");
      }
      setVoucherCode("");
      setCheckVoucher(false);
    }, 500);
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Thông tin không hợp lệ. Hãy nhập lại!");
      return;
    } else {
      dispatch(payCart());
      alert("Đặt hàng thành công");
      history("/");
    }
  };

  const cartItems = (product, index) => {
    return (
      <tr key={index}>
        <td className="checkout-product">
          {product.product_name} - {product.material}
        </td>
        <td>{product.qty}</td>
        <td>
          <span>{formatCurrency(product.price)}</span>
        </td>
      </tr>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="wrap">
          <div className="main">
            <div className="main__content">
              <div>Thông tin khách hàng</div>
              <div>
                <form className="form" id="checkout-form" onSubmit={handlePay}>
                  <div className="form-contact">
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Họ và tên (bắt buộc)"
                    />
                    {errors.username && <small>{errors.username}</small>}
                  </div>
                  <div className="form-contact">
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại (bắt buộc)"
                    />
                    {errors.phone && <small>{errors.phone}</small>}
                  </div>
                  <div className="address-title">Địa chỉ giao hàng</div>
                  <div className="address-box">
                    <div className="form-contact address-info">
                      <select
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleCityChange(e)}
                      >
                        <option value="">Tỉnh / Thành phố</option>
                        {data.map((city) => (
                          <option value={city.name} key={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {errors.city && <small>{errors.city}</small>}
                    </div>
                    <div className="form-contact address-info">
                      <select
                        name="district"
                        id="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!formData.city}
                      >
                        {renderDistrictOptions()}
                      </select>
                      {errors.district && <small>{errors.district}</small>}
                    </div>
                    <div className="form-contact address-info">
                      <select
                        name="ward"
                        id="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        disabled={!formData.district}
                      >
                        {renderWardOptions()}
                      </select>
                      {errors.ward && <small>{errors.ward}</small>}
                    </div>
                    <div className="form-contact address-info">
                      <input
                        type="text"
                        placeholder="Số nhà, tên đường"
                        disabled={!formData.ward}
                      />
                    </div>
                  </div>
                  <div className="form-contact">
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Ghi chú"
                    ></textarea>
                  </div>
                  <div className="payment-method">Phương thức thanh toán</div>
                  <div className="payment-box">
                    <input
                      id="payment"
                      type="radio"
                      name="payment"
                      onChange={handleChange}
                      value="cod"
                    />
                    <label htmlFor="payment">
                      Thanh toán khi giao hàng (COD)
                    </label>
                    <div>
                      <i className="fa-solid fa-money-bill"></i>
                    </div>
                  </div>
                  {errors.payment && <small>{errors.payment}</small>}
                </form>
              </div>
            </div>
            <div className="free-ship">
              Free ship cho đơn hàng trên {formatCurrency(10000000)}
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar__header">Đơn hàng</div>
            <div className="sidebar__content">
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td className="san-pham">Sản phẩm</td>
                      <td className="so-luong">Số lượng</td>
                      <td>Thành tiền</td>
                    </tr>
                    {state.map(cartItems)}
                  </tbody>
                </table>
                <div className="voucher">
                  <input
                    type="text"
                    placeholder="Bạn có mã giảm giá?"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <button
                    className="voucher-btn"
                    onClick={handleClick}
                    disabled={voucherCode === "" ? true : false}
                  >
                    {checkVoucher ? (
                      <i className="fa-solid fa-spinner"></i>
                    ) : (
                      "Nhập"
                    )}
                  </button>
                  {
                    <Tippy
                      content={
                        <div>
                          <div>VOUCHER1 : Giảm {formatCurrency(1000000)}</div>
                          <div>VOUCHER2 : Giảm {formatCurrency(200000)}</div>
                          <div>VOUCHER3 : Giảm {formatCurrency(500000)}</div>
                        </div>
                      }
                      placement="bottom"
                    >
                      <div className="all-voucher">
                        <i
                          className="fa-regular fa-circle-question"
                          onClick={() => setShowTooltip(!showTooltip)}
                        ></i>
                      </div>
                    </Tippy>
                  }
                </div>

                {dataVoucher !== 0 && (
                  <div className="voucher-success">
                    {showVoucher}
                    <button
                      className="voucher-success__btn"
                      onClick={() => {
                        setShowVoucher("");
                        setDataVoucher(0);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="cart-bill">
                <div className="cart-bill__info">
                  <p>Thành tiền :</p>
                  <p>{formatCurrency(calTotalAmount)}</p>
                </div>
                <div className="cart-bill__info">
                  <p>Giảm giá từ Voucher :</p>
                  <p className="ship-money">{formatCurrency(dataVoucher)}</p>
                </div>
                <div className="cart-bill__info">
                  <p>Phí vận chuyển :</p>
                  {!shipMoney ? (
                    <p className="ship-money">Free Ship</p>
                  ) : (
                    <p>{formatCurrency(shipMoney)}</p>
                  )}
                </div>
              </div>
              <div className="cart-bill__total">
                <div className="cart-bill__info">
                  <p className="total-price">Tổng tiền :</p>
                  <p>
                    {formatCurrency(calTotalAmount + shipMoney - dataVoucher)}
                  </p>
                </div>
                <div className="cart-bill__info">
                  <Link to={"/gio-hang"}>
                    <i className="fa-solid fa-chevron-left"></i> Quay về giỏ
                    hàng
                  </Link>
                  <button className="btn" type="submit" form="checkout-form">
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
