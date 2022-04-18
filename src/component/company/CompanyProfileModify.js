import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, rgbToHex, TextField } from "@mui/material";
import "./Profile.css";
import { hexToRgb, Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Popup2 from "./Popup2";
import Popup from "./Popup";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

import "./FeedPopupButton.css";
import { useUserState } from "../member/UserContext";

function CompanyProfileModify() {
  const [board, setBoard] = useState([]);
  const navigate = useNavigate();
  const { user } = useUserState();

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

    axios.post("http://localhost:9090/company/view/"+user.user_seq).then((res) => {
      console.log(res.data);
      setBoard(res.data);
    });

    //console.log( heroState.hero );
  }, []);

  const onClickModify = () => {
    const frmData = new FormData();
    frmData.append("seq", board.seq);
    frmData.append("name", board.name);
    frmData.append("srt", board.srt);
    frmData.append("day", board.day);
    frmData.append("size", board.size);
    frmData.append("people", board.people);
    frmData.append("address1", board.address1);
    frmData.append("address2", board.address2);
    frmData.append("phone", board.phone);
    frmData.append("mail", board.mail);
    frmData.append("intro", board.intro);

    axios.post("http://localhost:9090/company/update/", frmData).then((res) => {
      console.log(res.data);
      setBoard(res.data);
      navigate("/company/"+user.user_seq);
      window.location.reload(true);
    });

    //navigate('/company')
  };

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log("value", value);
    console.log("name", name);
    setBoard({
      ...board, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  return (
    <div className="com_profile">
      <Card sx={{ minWidth: 500, maxHeight: 1000 }}>
      <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={board.image2}
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
              src={board.image1}
              sx={{ width: 100, height: 100 }}
              style={{ top: -50 , width: 150, height: 150}}
            />
          </CardContent>
        </CardActionArea>
        
      </Card>

      <hr style={{ color: "rgba(0,0,0,0.1)" }} />
      {/* <Button variant="contained"onClick={onClickModify}>수정하기</Button> */}
      <div style={{ textAlign: "center" }} onClick={onClickModify}>
        <BuildOutlinedIcon style={{ color: "#4fd3d8" }} />
        수정완료
      </div>
      <Popup2 title="회사명" message={board.name} name={"name"} onChange={onChange}></Popup2>
      <Popup2
        title="한줄프로필"
        message={board.srt}
        name={"srt"}
        onChange={onChange}
      ></Popup2>
      <Popup2
        title="창립일"
        message={board.day}
        name={"day"}
        onChange={onChange}
      ></Popup2>
      <Popup2
        title="규모"
        message={board.size}
        name={"size"}
        onChange={onChange}
      ></Popup2>
      <Popup2
        title="사원수"
        message={board.people}
        name={"people"}
        onChange={onChange}
      ></Popup2>
      <Popup
        title="주소"
        message={board.address1 + " " + board.address2}
        onChange={onChange}
      ></Popup>
      <Popup title="연락처" message={board.phone} onChange={onChange}></Popup>
      <Popup title="이메일" message={board.mail} onChange={onChange}></Popup>
      <Popup2
        title="설명프로필"
        message={board.intro}
        name={"intro"}
        onChange={onChange}
      ></Popup2>
    </div>
  );
}

export default CompanyProfileModify;
