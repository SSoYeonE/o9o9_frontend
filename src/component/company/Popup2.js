import React from "react";
import "./FeedPopupButton.css";
import { Avatar } from "@material-ui/core";

function Popup2(props) {
  return (
    <div className="FeedPopupButton__top">
      <div>
        <span className="FeedPopupButton__span" style={{ width: "80px" }}>
          {props.title}
        </span>
        <input
          name={props.name}
          value={props.message}
          onChange={(e) => props.onChange(e)}
          className="FeedPopupButton__input"
          //placeholder={`${board.size}, ${board.size}`}
        />
      </div>
    </div>
  );
}

export default Popup2;
