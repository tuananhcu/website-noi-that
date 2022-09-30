import React, { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

function Gallery(props) {
  const imgs = props.image || [];
  const [wordData, setWordData] = useState(imgs[0]);
  const handleClick = (index) => {
    console.log(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  return (
    <div className="gallery">
      <img src={`../../${wordData}`} alt="" />
      <ScrollContainer className="scroll-container">
        <div className="flex_row">
          {imgs.map((data, i) => (
            <div className="thumbnail" key={i}>
              <img
                className={wordData === data ? "clicked" : ""}
                src={`../../${data}`}
                onClick={() => handleClick(i)}
                height="70"
                width="100"
                alt=""
              />
            </div>
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
}

export default Gallery;
