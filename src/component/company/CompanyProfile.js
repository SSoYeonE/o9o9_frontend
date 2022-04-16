import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, rgbToHex } from "@mui/material";
import "./Profile.css";
import { hexToRgb, Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup.js";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import {  Link } from "react-router-dom";
import "./FeedPopupButton.css"


function CompanyProfile() {
  const [board, setBoard] = useState([])
  const navigate = useNavigate();
  useEffect(() => { 
    console.log("데이터 불러오기");
    // setBoard(
    //    ...board,
    //    [
    //      {id:1, title:"제목1", writer:"홍길동1", contents:"내용을 막 넣자1"},
    //      {id:2, title:"제목2", writer:"홍길동2", contents:"내용을 막 넣자2"},
    //      {id:3, title:"제목3", writer:"홍길동3", contents:"내용을 막 넣자3"},
    //      {id:4, title:"제목4", writer:"홍길동4", contents:"내용을 막 넣자4"},
    //      {id:5, title:"제목5", writer:"홍길동5", contents:"내용을 막 넣자5"}
    //   ]
    // );

    axios.post('http://localhost:9090/company/view/1')
    .then(res => {
      console.log(res.data)
      setBoard(res.data);
    });

    //console.log( heroState.hero );
  }, []);

const onClickModify = () => {
  navigate('/company/modify')
}
  return (
    <div className="com_profile">
      <Card sx={{ minWidth: 500, maxHeight: 1000 }}>
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
              sx={{ width: 100, height: 100 }}
              style={{ top: -50 , width: 150, height: 150}}
            />

            
          </CardContent>

          <hr style={{ color: "rgba(0,0,0,0.1)" }} />
          {/* <Button variant="contained"onClick={onClickModify}>수정하기</Button> */}
          <div style={{textAlign:"center"}} onClick={onClickModify}>
          <BuildOutlinedIcon style={{color:"#4fd3d8"}}/>
            수정하기
          </div>
          <CardContent>
            <Popup title="회사명" message={board.name}></Popup>
            <Popup title="한줄프로필" message={board.srt}></Popup>
            <Popup title="창립일" message={board.day}></Popup>
            <Popup title="규모" message={board.size}></Popup>
            <Popup title="사원수" message={board.people}></Popup>
            <Popup title="주소" message={board.address1+" " +board.address2}></Popup>
            <Popup title="연락처" message={board.phone}></Popup>
            <Popup title="이메일" message={board.mail}></Popup>
            <Popup title="설명프로필" message={board.intro}></Popup>
           
          </CardContent>
          
         
        </CardActionArea>
        
      </Card>
      

    </div>
  );
}

export default CompanyProfile;