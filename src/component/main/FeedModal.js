import React, { useState } from "react";
import "./FeedModal.css";
import FeedModalContents from "./FeedModalContents";
import {mboard_seq,user_seq} from "./FeedModalContents";


const Modal = (props) => {
  const [mboard_seq,setMboardseq] = useState();
  const [user_seq,setUserseq]=useState();
  //  close={closeModal}
  const { open, close, header, setIsPostChange, isPostChange } = props;
  const [section_height, setSectionHeight] = useState("500px");


  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section style={{height:section_height}}>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main style={{ paddingBottom: -16 }}>
            <p>{props.children}</p>
            <FeedModalContents props={props} setSectionHeight={setSectionHeight}/>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
