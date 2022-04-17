import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, rgbToHex } from "@mui/material";
import "./Profile.css";
import { hexToRgb, Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "./Popup.js";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import {  Link } from "react-router-dom";
import "./FeedPopupButton.css"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import FavoriteIcon from '@mui/icons-material/Favorite'; //follow 시
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; //unfollow 시
import { useUserState } from "../member/UserContext";



function CompanyProfile() {
  const [board, setBoard] = useState([])
  const [isFollow, setIsFollow] = useState(false);
  const navigate = useNavigate();
  const {user_seq} = useParams();

  const { user } = useUserState();

     React.useEffect(() => {
       console.log("App----------", user);
       console.log(typeof user.user_seq, typeof user_seq)
     }, [user]);
   

  useEffect(() => { 
    console.log("데이터 불러오기", user_seq);
    // setBoard(
    //    ...board,
    //    [
    //      {id:1, title:"제목1", writer:"홍길동1", contents:"내용을 막 넣자1"},
    //      {id:2, title:"제목2", writer:"홍길동2", contents:"내용을 막 넣자2"},
    //      {id:3, title:"제목3", writer:"홍길동3", contents:"내용을 막 넣자3"},
    //      {id:4, title:"제목4", writer:"홍길동4", contents:"내용을 막 넣자4"},
    //      {id:5, title:"제목5", writer:"홍길동5", contents:"내용을 막 넣자5"}
    //   ]
    // ); /follow/isfollow

    axios.post('http://localhost:9090/company/view/'+user_seq)
    .then(res => {
      console.log(res.data)
      setBoard(res.data);

    
    });
  
  
    if(user.user_seq !== user_seq){
      const frmData = new FormData();
      frmData.append("follower_seq", user.user_seq);
      frmData.append("followee_seq", user_seq);

      console.log( 'isfollowing -> ', user.user_seq,  user_seq)


      axios.post('http://localhost:9090/follow/isfollow', frmData)
      .then(res => {
        console.log(res.data.result);
        if (res.data.result === true) {
          setIsFollow(true);
        }
      });
  }

  }, []);

  useEffect(()=>{

    if(board.length!==0){
    console.log(user.user_seq, board.user_seq, typeof user.user_seq , typeof board.user_seq , board.user_seq === user.user_seq );
  }

  }, [board]);

const onClickModify = () => {
  navigate('/company/modify')
}
const onClickCandList = () => {
  navigate('/company/apply')
}
const onClickFollow = () => {
  const frmData = new FormData();
  frmData.append("follower_seq", user.user_seq);
  frmData.append("followee_seq", user_seq);

  console.log( 'isfollowing -> ', user.user_seq,  user_seq)

  // 팔로우 or 언팔로우
  if(isFollow) {
    axios.post('http://localhost:9090/follow/unfollow', frmData)
    .then(res => {
      console.log(res.data.result);
      if (res.data.result === true) {
        setIsFollow(false);
      }
    });

  } else {
    axios.post('http://localhost:9090/follow/follow', frmData)
    .then(res => {
      console.log(res.data.result);
      if (res.data.result === true) {
        setIsFollow(true);
      }
    });

  }

}
  return (
    <div className="com_profile">
      <>
      <Card sx={{ minWidth: 500, maxHeight: 1000 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={board.image2}
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
              src={board.image1}
              sx={{ width: 100, height: 100 }}
              style={{ top: -50 , width: 150, height: 150}}
            />
          </CardContent>
        </CardActionArea>
        
      </Card>
      <hr style={{ color: "rgba(0,0,0,0.1)" }} />
          {/* <Button variant="contained"onClick={onClickModify}>수정하기</Button> */}
          
          <div style={{display:"flex"}}>
          <div style={{textAlign:"center"}} onClick={onClickCandList}>
          <EmojiPeopleIcon style={{color:"#4fd3d8", size:"500px"}}/>
            지원자 목록 보기
          </div>
          &nbsp;&nbsp;&nbsp;
          {Number(user.user_seq) === board.user_seq ? 
          <div style={{textAlign:"center"}} onClick={onClickModify}>
          <BuildOutlinedIcon style={{color:"#4fd3d8"}}/>
            수정하기
          </div>
          : 
          <div>
             {/* FavoriteBorderIcon 팔로우가 아닐시에는 이아이콘 */}
            <div style={{textAlign:"center"}} onClick={onClickFollow}>
            <FavoriteIcon style={{color:"#4fd3d8"}}/>
              
              { isFollow === true ? "언팔로우" : "팔로우"}
            
          </div>
            </div>}
          &nbsp;&nbsp;&nbsp;
         
          </div>

          <CardContent>
            
           
          </CardContent>

          <Popup title="회사명" message={board.name}></Popup>
            <Popup title="한줄프로필" message={board.srt}></Popup>
            <Popup title="창립일" message={board.day}></Popup>
            <Popup title="규모" message={board.size}></Popup>
            <Popup title="사원수" message={board.people}></Popup>
            <Popup title="주소" message={board.address1+" " +board.address2}></Popup>
            <Popup title="연락처" message={board.phone}></Popup>
            <Popup title="이메일" message={board.mail}></Popup>
            <Popup title="설명프로필" message={board.intro}></Popup>

          </>
    </div>
  );
}

export default CompanyProfile;