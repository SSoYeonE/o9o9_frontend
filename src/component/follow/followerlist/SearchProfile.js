import React, { useEffect, useState } from "react";
import "./FeedPopupButton.css";
import { Avatar } from "@material-ui/core";
import axios from "axios";




function SearchProfile({profile}) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(()=>{
    console.log('profile', profile);
  },[])


  return (
    <div className="FeedPopupButton">
      <div className="FeedPopupButton__top">
        <div>
          <Avatar src={profile.user_image1} alt={profile.user_name} />
          
          <input
            readOnly
            value={input}
            // onChange={(e) => setInput(e.target.value)}
            className="FeedPopupButton__input"
            placeholder={`${profile.user_name}, ${profile.profile_short}`}
          />
          
        </div>  
      </div> 
    </div>    
  );



   
 

  
  }

export default SearchProfile;