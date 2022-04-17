import React, { useEffect, useState } from "react";
import "./FeedPopupButton.css";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function SearchProfile({profile}) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const history = useNavigate();

  useEffect(()=>{
    console.log('profile', profile);
  },[])

  const onClick = ()=>{
    alert(profile.user_level, profile.user_seq);
    if(profile.user_level==="0"){
      // 일반 사용자 프로필
      // 우영님꺼
      history('/');
    } else {
      history('/company/'+profile.user_seq);
    }
  }
  return (
    
    <div className="FeedPopupButton" onClick={onClick}>
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