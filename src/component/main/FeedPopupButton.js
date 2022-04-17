import React, { useState } from "react";
import "./FeedPopupButton.css";
import { Avatar } from "@material-ui/core";
import Modal from "./FeedModal";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';


function FeedPopupButton({setIsPostChange, isPostChange}) {
  // const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // const user = {
  //   profilePic:
  //     "https://raw.githubusercontent.com/emilyoun/Facebook-Clone-with-REACT/main/Screen%20Shot%202021-01-02%20at%206.03.01%20PM.png",
  //   message: "WOW this works! ",
  //   timestamp: "This is a timestamp",
  //   username: "emilyoun",
  //   image:
  //     "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
  // };

  //
  const handleSubmit = (e) => {
    //! to prevent page refreshing when when we submit
    e.preventDefault();

    //!some clever db stuff here
    // db.collection("posts").add({
    //   message: input,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   profilePic: user.photoURL,
    //   username: user.displayName,
    //   image: imageUrl,
    // });

    //!resets enter
    setInput("");
    setImageUrl("");
  };

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="FeedPopupButton">
      <div className="FeedPopupButton__top">
        <div>
          {/* <Avatar src={user.photoURL} alt={user.username} /> */}
          <input
            readOnly
            value={input}
            // onChange={(e) => setInput(e.target.value)}
            onClick={openModal}
            className="FeedPopupButton__input"
            placeholder={ `오늘 당신의 기분은 어떠신가요? `}
          />
          <Modal open={modalOpen} close={closeModal} header="생각나누기" isPostChange={isPostChange} setIsPostChange={setIsPostChange}>
          <br/> 
          {/* <Avatar src={user.image} alt={user.username} style={{marginLeft:20}} /> */}
          </Modal>
         

          <button onClick={handleSubmit} type="submit">
            Hidden Submit
          </button>
        </div>
      </div>

      {/* <div className="FeedPopupButton__bottom">
        <div className="FeedPopupButton__option">
          <YardOutlinedIcon style={{color:"#5a92ff",cursor: "pointer"}} onClick={openModal} />
          <h3 onClick={openModal}>사진</h3>
        </div> */}

        {/* <div className="FeedPopupButton__option">
          <SmartDisplayOutlinedIcon style={{ color: "#8ee673" ,cursor: "pointer"}} onClick={openModal} />
          <h3 onClick={openModal}>동영상</h3>
        </div> */}

        {/* <div className="FeedPopupButton__option">
          <AddReactionOutlinedIcon style={{ color: "orange" ,cursor: "pointer"}} onClick={openModal} />
          <h3 onClick={openModal}>이모티콘</h3>
        </div> */}
        
        <div className="FeedPopupButton__option">
          <RateReviewOutlinedIcon style={{ color: "#fa81c0",marginLeft:"460px"}} onClick={openModal} />
        <h3 style={{marginleft:"1px"}} onClick={openModal}>글쓰기</h3>
        </div>

     
    </div>
  );
}

export default FeedPopupButton;
