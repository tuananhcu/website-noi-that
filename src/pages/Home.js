import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../api/request";
import Slider from "react-slick";
import SlideShow from "../components/SlideShow";
import Loading from "../components/Loading";
import slugifyText from "../utils/slugifyText";

function Home() {
  document.title = "Trang chủ | Nội thất Hoàng Hoan";
  useEffect(() => {
    const getNews = async () => {
      const res = await request.get("news");
      setDataNews(res.data.sort((a, b) => b.view - a.view));
    };
    getNews();
  }, []);

  const [dataNews, setDataNews] = useState([]);
  const category = [
    {
      category_name: "Phòng khách",
      image: "images/AnhCatTC/loai/icon-phong-khach.png",
    },
    {
      category_name: "Phòng ngủ",
      image: "images/AnhCatTC/loai/icon-phong-ngu.png",
    },
    {
      category_name: "Phòng bếp",
      image: "images/AnhCatTC/loai/icon-phong-bep.png",
    },
    {
      category_name: "Phòng tắm",
      image: "images/AnhCatTC/loai/icon-phong-tam.png",
    },
    {
      category_name: "Trẻ em",
      image: "images/AnhCatTC/loai/icon-tre-em.png",
    },
    {
      category_name: "Văn phòng",
      image: "images/AnhCatTC/loai/icon-van-phong.png",
    },
    {
      category_name: "Cầu thang",
      image: "images/AnhCatTC/loai/icon-cau-thang.png",
    },
    {
      category_name: "Đồ trang trí",
      image: "images/AnhCatTC/loai/icon-do-trang-tri.png",
    },
  ];
  const dataAboutUs = [
    "images/AnhCatTC/ve-chung-toi/ve-chung-toi-1.jpg",
    "images/AnhCatTC/ve-chung-toi/ve-chung-toi-2.jpg",
    "images/AnhCatTC/ve-chung-toi/ve-chung-toi-3.jpg",
    "images/AnhCatTC/ve-chung-toi/ve-chung-toi-4.jpg",
  ];
  const dataPolicy = [
    {
      img: "images/AnhCatTC/ve-chung-toi/chinh-sach.jpg",
      title: "chính sách giá",
      description: "Tốt nhất và công khai giá trên Website",
    },
    {
      img: "images/AnhCatTC/ve-chung-toi/san-pham.jpg",
      title: "sản xuất",
      description: "Trực tiếp sản xuất bởi đội ngũ nhân viên hàng đầu",
    },
    {
      img: "images/AnhCatTC/ve-chung-toi/chat-luong.jpg",
      title: "chất lượng",
      description: "Cam kết chất lượng sản phẩm và tiến độ thi công",
    },
    {
      img: "images/AnhCatTC/ve-chung-toi/bao-hanh.jpg",
      title: "bảo hành",
      description: "Dịch vụ bảo hành sản phẩm tốt nhất khu vực",
    },
  ];
  const dataSlidePartner = [
    "images/AnhCatTC/doi-tac/melissa.png",
    "images/AnhCatTC/doi-tac/muong-thanh.png",
    "images/AnhCatTC/doi-tac/sheraton.png",
    "images/AnhCatTC/doi-tac/sunrise-sapa.png",
    "images/AnhCatTC/doi-tac/the-coffee-house.png",
    "images/AnhCatTC/doi-tac/vinpearl.png",
    "images/AnhCatTC/doi-tac/marvella.png",
  ];
  var settingSlide = {
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section id="home-banner">
        <div className="home-banner__content">
          <h1>
            thế giới nội thất số 1 việt nam <br />
            <span>hoàng hoan</span>
          </h1>
          <p>
            Sứ mệnh của chúng tôi là kết hợp hài hòa giữa ý tưởng và mong muốn
            của khách hàng, đem lại những phút giây thư giãn tuyệt vời bên gia
            đình và những người thân yêu.
          </p>
          <Link to={"/lien-he"} className="home-banner__btn">
            liên hệ ngay
          </Link>
        </div>
      </section>
      <section id="home-category">
        <div className="list-category">
          <div className="row">
            {category.map((item, index) => (
              <div className="col-md-3" key={index}>
                <Link to={`/san-pham/${slugifyText(item.category_name)}`}>
                  <img src={item.image} alt="" />
                  <p>{item.category_name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {<SlideShow />}
      </section>
      <section id="home-aboutUs">
        <div className="home-aboutUs__content">
          <h4>về chúng tôi</h4>
          <div className="row">
            <div className="col-md-6">
              <img
                src="images/AnhCatTC/ve-chung-toi/ve-chung-toi.jpg"
                alt="về chúng tôi"
                className="h-100 w-100"
              />
            </div>
            <div className="col-md-6">
              <p>
                nội thất <span>hoàng hoan</span>
                <br />
                uy tín song hành chất lượng
              </p>
              <p>
                Nội thất của <span>Hoàng Hoan</span> chúng tôi tự hào là đức con
                tinh thần ra đời sau hơn 30 năm hoạt động trong lĩnh vực kinh
                doanh đồ gỗ nội thất với thương hiệu ĐỒ GỖ HOÀNG HOAN nổi tiếng.
              </p>
              <p>
                Tài nguyên của chúng tôi là đội ngũ kiến trúc sư tốt nghiệp ĐH
                Kiên Trúc Hà Nội với nhiều năm kinh nghiệm, luôn tràn đầy nhiệt
                huyết và sức sáng tạo của tuổi trẻ. Thế mạnh của chúng tôi là sở
                hữu xưởng nội thất hơn 10.000m2 tại Hà Nội sản xuất đa dạng các
                sản phẩm với giá cả luôn cạnh tranh.
              </p>
              <div className="list-img">
                <ul className="d-flex justify-content-between">
                  {dataAboutUs.map((item, index) => (
                    <li key={index}>
                      <div className="box">
                        <img src={item} alt="về chúng tôi 1" />
                        <div className="see-more">
                          <Link to={""} className="btn">
                            Xem thêm&nbsp;
                            <i
                              className="fa fa-angle-right"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="home-aboutUs__content">
          <h4>tại sao nên chọn hoàng hoan?</h4>
          <div className="row">
            {dataPolicy.map((item, index) => (
              <div className="col-md-6" key={index}>
                <div className="aboutUs-policy__item d-flex">
                  <div className="img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="content">
                    <p className="title">{item.title}</p>
                    <p className="desc">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="home-news">
        <div className="home-news">
          <h4>tin tức</h4>
          {dataNews.length === 0 ? (
            <Loading />
          ) : (
            <div className="row ">
              <div className="col-md-7 home-news__effect">
                <Link to={`/tin-tuc/${slugifyText(dataNews[0].title)}`}>
                  <div className="thumbnail box">
                    <div className="img img-main">
                      <img src={dataNews[0].image} alt="" />
                    </div>
                    <div className="main-content">
                      <p>{dataNews[0].title}</p>
                      <p>{dataNews[0].content}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-5">
                <div className="thumbnail">
                  <div className="home-news__effect">
                    {dataNews.slice(1, 4).map((item) => (
                      <div className="row fix-height" key={item.id}>
                        <div className="col-md-5 box">
                          <div className="img img-list">
                            <Link to={`/tin-tuc/${slugifyText(item.title)}`}>
                              <img src={item.image} alt="tin tức" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <p className="title">
                            <Link to={`/tin-tuc/${slugifyText(item.title)}`}>
                              {item.title}
                            </Link>
                          </p>
                          <p className="desc">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="readMore">
                    <Link to={"/tat-ca-tin-tuc"}>
                      Xem thêm
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section id="home-partner">
        <div className="home-partner">
          <h4>đối tác</h4>
          <Slider className="slider" {...settingSlide}>
            {dataSlidePartner.map((item, index) => (
              <div key={index}>
                <img src={item} alt="" />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section id="home-contact">
        <div className="home-contact">
          <div className="row">
            <div className="col-md-6">
              <p className="home-contact__content">
                Trải nghiệm dịch vụ <br />
                <strong>cùng Hoàng Hoan ngay</strong>
              </p>
            </div>
            <div className="col-md-6">
              <form className="home-contact__form" action="">
                <p>Thông tin liên hệ</p>
                <input type="email" placeholder="Email / Số điện thoại" />
                <button>Gửi</button>
              </form>
            </div>
          </div>
          <img className="image" src="images/ghe.png" alt="liên hệ" />
        </div>
      </section>
    </>
  );
}

export default Home;
