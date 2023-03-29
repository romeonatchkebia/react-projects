import React from "react";
import "./card.css";

function SelectList({ liked }) {
  return (
    <div className="selectList">
      {liked ? <h2>Unlike</h2> : <h2>Like</h2>}
      <h2>See Tweet</h2>
    </div>
  );
}

export default SelectList;
