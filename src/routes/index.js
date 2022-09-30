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
import WishList from "../pages/WishList";
import SearchResult from "../pages/SearchResult";
import NotFound from "../pages/NotFound";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/gioi-thieu", component: AboutUs },
  { path: "/san-pham", component: Products },
  { path: "/san-pham/:productCategory/:productName", component: Product },
  { path: "/san-pham/:productCategory", component: Category },
  { path: "/tin-tuc", component: News },
  { path: "/tat-ca-tin-tuc", component: AllNews },
  { path: "/tin-tuc/:newsTitle", component: NewsDetail },
  { path: "/doi-tac", component: Partner },
  { path: "/lien-he", component: Contact },
  { path: "/gio-hang", component: Cart },
  { path: "/tim-kiem", component: SearchResult },
  { path: "/danh-sach-yeu-thich", component: WishList },
  { path: "*", component: NotFound },
];

export default publicRoutes;
