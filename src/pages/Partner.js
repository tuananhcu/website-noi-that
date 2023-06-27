import React from "react";

function Partner() {
  document.title = "Đối tác của chúng tôi";

  const data = [
    {
      image: "images/AnhCatTC/doi-tac/vinpearl.png",
      partner_name: "công ty cổ phần vinpearl",
      description:
        "Vinpearl là thương hiệu dịch vụ du lịch nghỉ dưỡng - giải trí lớn nhất Việt Nam, Vinpearl sở hữu chuỗi khách sạn resort và trung tâm hội nghị đẳng cấp 5 sao, các khu vui chơi giải trí quốc tế tọa lạc tại những danh thắng du lịch nổi tiếng nhất của Việt Nam.",
      id: "1",
    },
    {
      image: "images/AnhCatTC/doi-tac/muong-thanh.png",
      partner_name: "tập đoàn khách sạn mường thanh",
      description:
        "Tại Mường Thanh, chúng tôi mời bạn cùng khởi hành chuyến đi tìm về không gian thanh thản chứa đựng những nét văn hóa mang đậm tinh thần bản sắc văn hóa Việt Nam, nơi con người gắn kết và thân ái gửi trao nhau tình cảm chân thành.",
      id: "2",
    },
    {
      image: "images/AnhCatTC/doi-tac/sheraton.png",
      partner_name: "sheraton hanoi hotel",
      description:
        "Situated on the shores of HaNoi’s West Lake and surrounded by its many local attractions, Sheraton HaNoi Hotel is just a quick drive to the bustling downtown of HaNoi City. Explore the nearby Old Quarter, home to Hoan Kiem Lake, HaNoi Opera House and exceptional boutiques.",
      id: "3",
    },
    {
      image: "images/AnhCatTC/doi-tac/the-coffee-house.png",
      partner_name: "the coffee house",
      description:
        "Tại The coffee house, chúng tôi luôn trân trọng những câu chuyện và đề cao giá trị Kết nối con người. Chúng tôi mong muốn The Coffee House sẽ trở thành “Nhà Cà Phê”, nơi mọi người xích lại gần nhau và tìm thấy niềm vui, sự sẻ chia thân tình bên những tách cà phê đượm hương, chất lượng.",
      id: "4",
    },
    {
      image: "images/AnhCatTC/doi-tac/marvella.png",
      partner_name: "marvella hotel nha trang",
      description:
        "Marvella một thương hiệu khách sạn 4 sao mới xây dựng theo phong cách cách tân cổ điển, sang trọng.",
      id: "5",
    },
  ];

  return (
    <div className="box-content">
      <div className="banner-page">
        <div className="banner-page__image">
          <img src="images/AnhCatTC/DOITAC.jpg" alt="đối tác" />
        </div>
        <div className="banner-page__title">
          <img src="images/AnhCatTC/logo3.png" alt="" />
          <p>ĐỐI TÁC</p>
        </div>
      </div>
      <div className="wrapper-box box-partner">
        {data.map((item) => (
          <div className="row" key={item.id}>
            <div className="col-md-4">
              <div className="thumbnail">
                <img src={item.image} alt="" />
              </div>
            </div>
            <div className="col-md-8 content">
              <div className="thumbnail">
                <p className="title">{item.partner_name}</p>
                <p className="desc">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partner;
