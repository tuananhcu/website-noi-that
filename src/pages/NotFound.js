import { Link } from "react-router-dom";

const NotFound = () => {
  document.title = "Page Not Found";
  return (
    <div className="text-center not-found">
      <h1 className="title">
        404 <br />
        Page Not Found
      </h1>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <p>Đi tới Trang chủ bằng Nút bên dưới</p>
      <Link to="/" className="btn btn-outline-primary">
        Trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
