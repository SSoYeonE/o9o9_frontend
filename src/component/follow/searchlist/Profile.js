import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, rgbToHex } from "@mui/material";
import "./Profile.css";
import { hexToRgb } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../member/UserContext";

export default function Profile() {
  const history = useNavigate();
  const { user } = useUserState();

  React.useEffect(() => {
    console.log("App----------", user);
  }, [user]);


  
  const demoProfile = {
    "user_seq": "",
    "user_image1": "",
    "user_image2": "",
    "profile_short": "",
    "user_name": "",
    "user_level":""
};

  const [profile, setProfile] = useState(demoProfile);

  useEffect(()=>{
    getProfile();
  }, [])
   
  const getProfile = async () => {
      // 임시코드
      const user_seq = user.user_seq;
      await axios 
      .get(`http://127.0.0.1:9090/sideprofile/view/${user_seq}`)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((e) => {
      });
  }

  useEffect(()=>{
    console.log(profile);
  }, [profile])

  const profileDetail = ()=>{
  
    if(user.user_level === '1'){
      history("/company/"+user.user_seq)
    }
    else {
      history("/user/"+user.user_seq)
    }
  }


  return (
    <div className="profile">
      { profile &&   <Card sx={{ minWidth: 220, maxHeight: 500 }} onClick={profileDetail}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={profile.user_image2}
            alt="user_image"
          />

          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={profile.user_image1}
              sx={{ width: 70, height: 70 }}
              style={{ top: -50 }}
            />
          </CardContent>
          <hr style={{ color: "rgba(0,0,0,0.1)" }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {profile.user_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.profile_short}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
       }
    </div>
   
  );
}
