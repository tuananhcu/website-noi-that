// Public Routes
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Category from "../pages/Category";
import Products from "../pages/Products";
import Product from "../pages/Product";
import AllNews from "../pages/AllNews";
import News from "../pages/News";
import NewsDetail from "../pages/NewsDetail";
import Partner from "../pages/Partner";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import WishList from "../pages/WishList";
import SearchResult from "../pages/SearchResult";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/gioi-thieu", component: AboutUs },
  { path: "/san-pham", component: Products },
  { path: "/:productCategory/:productName", component: Product },
  { path: "/:productCategory", component: Category },
  { path: "/tin-tuc", component: News },
  { path: "/tat-ca-tin-tuc", component: AllNews },
  { path: "/tin-tuc/:newsTitle", component: NewsDetail },
  { path: "/doi-tac", component: Partner },
  { path: "/lien-he", component: Contact },
  { path: "/gio-hang", component: Cart },
  { path: "/thanh-toan", component: Checkout },
  { path: "/tim-kiem", component: SearchResult },
  { path: "/danh-sach-yeu-thich", component: WishList },
  { path: "*", component: NotFound },
  { path: "/dang-nhap", component: Login },
  { path: "/dang-ky-tai-khoan", component: Register },
];

export default publicRoutes;
