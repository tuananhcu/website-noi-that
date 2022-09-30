import React from "react";

function Loading() {
  return (
    <div style={{ margin: "0 auto" }}>
      <div className="loaded"></div>
      <p className="content-loaded">Đang tải ...</p>
    </div>
  );
}

export default Loading;
