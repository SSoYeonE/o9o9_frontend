import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea } from "@mui/material";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile">
      <Card sx={{ minWidth: 220, maxHeight: 500 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://raw.githubusercontent.com/emilyoun/Facebook-Clone-with-REACT/main/Screen%20Shot%202021-01-02%20at%206.34.08%20PM.png"
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
              src="https://raw.githubusercontent.com/emilyoun/Facebook-Clone-with-REACT/main/Screen%20Shot%202021-01-02%20at%206.03.01%20PM.png"
              sx={{ width: 70, height: 70 }}
              style={{ top: -50 }}
            />
          </CardContent>
          <hr style={{ color: "rgba(0,0,0,0.1)" }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              test
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
