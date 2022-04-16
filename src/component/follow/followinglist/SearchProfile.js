import React, { useEffect, useState } from "react";
import "./FeedPopupButton.css";
import { Avatar } from "@material-ui/core";
import axios from "axios";




function SearchProfile({profile}) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  


  return (
    <div className="FeedPopupButton">
      <div className="FeedPopupButton__top">
        <div>
          <Avatar src={profile.userimage1} alt={profile.username} />
          
          <input
            readOnly
            value={input}
            // onChange={(e) => setInput(e.target.value)}
            className="FeedPopupButton__input"
            placeholder={`${profile.follow_follower}, ${profile.user_business}`}
          />
          
        </div>  
      </div> 
    </div>    
  );



   
 

  
  }

export default SearchProfile;