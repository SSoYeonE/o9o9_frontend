import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, rgbToHex } from "@mui/material";
import "./Profile.css";
import { hexToRgb } from "@material-ui/core";
import axios from "axios";

export default function Profile() {

  const demoProfile = {
    "user_seq": "",
    "user_image1": "",
    "user_image2": "",
    "profile_short": "",
    "user_name": ""
};

  const [profile, setProfile] = useState(demoProfile);

  useEffect(()=>{
    getProfile();
  }, [])
   
  const getProfile = async () => {
      // 임시코드
      const user_seq = '1';
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



  return (
    <div className="profile">
      <Card sx={{ minWidth: 220, maxHeight: 500 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={profile.user_image2}
            alt="green iguana"
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
    </div>
  );
}
