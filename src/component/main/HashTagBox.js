import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./FeedPopupButton.css";

const HashTagBox = ({ keyword }) => {
  return (
    <Card
      sx={{
        marginTop: "30px",
        marginBottom: "-15px",
        display: "flex",
        width: "100%",
        borderRadius: "15px",
        boxShadow: "0px 5px 7px -7px rgba(0, 0, 0, 0.75)",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151, float: "right" }}
          image="https://ph-files.imgix.net/ee05ca52-b419-44bb-b99f-3f92899fcf41.png?auto=format"
          alt="Live from space album cover"
        />
        <CardContent>
          <Typography component="div" variant="h3">
            {keyword}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            #hashtag#o9o9
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default HashTagBox;
