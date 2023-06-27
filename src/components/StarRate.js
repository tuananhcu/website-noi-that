import React from "react";
import { Rating } from "react-simple-star-rating";

function StarRate({ value, size }) {
  return (
    <>
      <Rating
        iconsCount={5}
        initialValue={value}
        size={size || 20}
        fillColor={"#bd945f"}
        emptyColor={"#cccccc"}
        readonly={true}
      />
    </>
  );
}

export default StarRate;
