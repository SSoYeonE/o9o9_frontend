import { TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
//import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { ButtonBase } from "@mui/material";
import "./FeedModalContents.css";
import FeedModalHashtags from "./FeedModalHashtags";
import './Emoji.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Slack from "./Slack";
import SlackSelector from "react-reactions/lib/components/slack/SlackSelector";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useUserState } from "../member/UserContext";

const FeedModalContents = ({props, setSectionHeight}) => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [files, setFiles] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [hashArr, setHashArr] = useState([]);
  const [contents, setContents] = useState("");
  const [showSelector, setShowSelector] = useState(false);
  const [posting_type, setPosting_type] = useState("");
  
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [work_area, setWork_area] = useState("");
  const [work_field, setWork_field] = useState("");
  const [work_condition, setWork_condition] = useState("");
  const [mboard_seq, setMboardSeq] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [user_seq, setUserSeq] = useState("");

  let history = useNavigate (); 

  const { user } = useUserState();

  React.useEffect(() => {
    console.log("App----------", user);
  }, [user]);

  const {post, open, close, header } = props;

  // 임시 변수
  // 0 : 일반사용자
  // 1: 회사
  const [userLevel, setUserLevel] = useState(1);


  useEffect(()=>{
    console.log("[props value-------------->]", props, typeof close);
    console.log('======post 데이터 확인=======', post);

    if(post != null){
    
      setImageSrc(post.contents_url);
      //setHashArr(...post.hashtag);
      setContents(post.contents);
      setPosting_type(post.posting_type);
      setMboardSeq(post.mboard_seq);
      setStart_date(post.start_date);
      setEnd_date(post.end_date);
      setCompany_name(post.company_name);
      setWork_area(post.work_area);
      setWork_field(post.work_field);
      setWork_condition(post.work_condition);
      setMboardSeq(post.mboard_seq);
      setUserSeq(user.user_seq);

      const harr =  post.hashtag.split("#").map((data)=>data.trim());
      setHashArr((hashArr)=>[...hashArr, ...harr]);
    }

  }, []);

  useEffect(() => {
    console.log("hashArr--->", hashArr);
    setLoading(false);
    if (typeof window !== "undefined" && hashArr.length!==0) {
      // 해시태그 문자열 해체
      // const harr = post.hashtag.split("#");
      // console.log(harr);
      /* 요소 불러오기, 만들기*/
      console.log('hashArr1------', hashArr);
       for(var hashtag of hashArr){
        const $HashWrapOuter = document.querySelector(".HashWrapOuter");
        const $HashWrapInner = document.createElement("div");
        $HashWrapInner.className = "HashWrapInner";

        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener("click", () => {
          $HashWrapOuter?.removeChild($HashWrapInner);
          console.log($HashWrapInner.innerHTML);
          // console.log(hashtag);
          setHashArr(hashArr.filter((hashtag) => hashtag));

          //console.log('hashArr2------', hashArr.filter((hashtag) => hashtag));
        });
      
        $HashWrapInner.innerHTML = "#" + hashtag;
        $HashWrapOuter?.appendChild($HashWrapInner);
      }
    }

  }, [isLoading]);


  // 사진 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };


  const onChangeContent = (e) => {
    console.log(e.target.value);
    setContents(e.target.value);
  };
  //const[viewcontent,setViewContent] = useState([]);

  const writeBtn = ()=>{
    // content(+emoji), hashtag, image
    setShowSelector(false);
    //해시태그
    let hashtag = "";
    if(hashArr.length !== 0){
      hashtag = hashArr.reduce((acc, cur)=>{
        if(cur.length>0){
          return  acc+"#"+cur;
        }
        return acc;
      })
    
     //setViewContent(viewcontent.concat({...FeedModalContents}));
      //setHashtag(result);
    }


    var frmData = new FormData();

    console.log("document.myform.filename.files[0]:-----", document.myform.filename.files[0]);
    frmData.append("contents", contents);
    frmData.append("file", document.myform.filename.files[0]);
    frmData.append("mboard_seq", mboard_seq)
    frmData.append("hashtag", hashtag);
    frmData.append("user_seq", user.user_seq);
    console.log('user_seq=-=================-=-=---??',user.user_seq);
    frmData.append("view_yn", 'y');
    frmData.append("del_yn", 'N');
    frmData.append("like_seq", 1);
    frmData.append("posting_type", posting_type);
    frmData.append("contents_url", imageSrc);

    frmData.append("start_date", start_date);
    frmData.append("end_date", end_date);
    frmData.append("company_name", company_name);
    frmData.append("work_area", work_area);
    frmData.append("work_field", work_field);
    frmData.append("work_condition", work_condition);


    if(mboard_seq === ""){

      Axios.post('http://localhost:9090/mainboard/insert/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("등록되었습니다.");
            close();
            window.location.reload();
            history('/');//list 로 이동하기 
          } 
      );
    } else {
      Axios.post('http://localhost:9090/mainboard/update/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("수정되었습니다.");
            close();
            window.location.reload();
            history('/');//list 로 이동하기 
          } 
      );
    }


  }
const onClickEmoji = () => {
  setShowSelector(!showSelector);
  
}

const handleSelect = (emoji) => {
  console.log(emoji);
  setContents(contents+emoji);
  setShowSelector(false);

}

useEffect(()=>{
  console.log(contents)
}, [contents])


const onClickImgBtn = () => {
  setShowSelector(false);
}
const onClickVideoBtn = () => {
  setShowSelector(false);
}
const onChangeStartDate = (e)=>{
  setStart_date(e.target.value);
}
const onChangeEndDate= (e)=>{
  setEnd_date(e.target.value);
}
const onChangeCompanyName= (e)=>{
  setCompany_name(e.target.value);
}
const onChangeWorkArea= (e)=>{
  setWork_area(e.target.value);
}
const onChangeWorkField= (e)=>{
  setWork_field(e.target.value);
}
const onChangeCondition= (e)=>{
  setWork_condition(e.target.value);
}
const onChangePostingType= (e)=>{
  setPosting_type(e.target.value);
}



useEffect(()=>{
  console.log(posting_type);
  console.log(posting_type === '1' );

  if(posting_type === '1'){
    setSectionHeight("900px");
  } else {
    setSectionHeight("500px");
  }


}, [posting_type])

// onChange로 관리할 문자열
const [hashtag, setHashtag] = useState("");
// 해시태그를 담을 배열
//const [hashArr, setHashArr] = useState([""]);

const onChangeHashtag = (e) => {
  setHashtag(e.target.value);
};


const onKeyUp = useCallback(
  (e) => {
    if (typeof window !== "undefined") {
      /* 요소 불러오기, 만들기*/
      const $HashWrapOuter = document.querySelector(".HashWrapOuter");
      const $HashWrapInner = document.createElement("div");
      $HashWrapInner.className = "HashWrapInner";

      /* 태그를 클릭 이벤트 관련 로직 */
      $HashWrapInner.addEventListener("click", () => {
        $HashWrapOuter?.removeChild($HashWrapInner);
        console.log($HashWrapInner.innerHTML);
        setHashArr(hashArr.filter((hashtag) => hashtag));
      });

      /* enter 키 코드 :13 */
      if (
        (window.event.keyCode === 32 || window.event.keyCode === 13) &&
        e.target.value.trim() !== ""
      ) {
        //if (e.target.value.trim() !== "") {
        $HashWrapInner.innerHTML = "#" + e.target.value;
        $HashWrapOuter?.appendChild($HashWrapInner);
        setHashArr((hashArr) => [...hashArr, hashtag]);
        setHashtag("");
      }
    }
  },
  [hashtag, hashArr]
);

const onClickImg = () =>{
  setImageSrc("");
  
}

  return (
    <>
         {
            userLevel && 
            
          <>
          <Box sx={{ width: "100px", margin:"10px"}}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          글 종류
          </InputLabel>
          <NativeSelect name="posting_type" onChange={onChangePostingType} defaultValue={0} value={posting_type}>
          <option value={'0'}>일반글</option>
          <option value={'1'}>채용공고</option>
          <option value={'2'}>광고</option>
          </NativeSelect>
        </Box>
        

        {posting_type === '1' &&

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width:"95%",
                padding:"15px 15px 15px 15px"
              }}
            >     

            { post != null ?  <>
            <TextField fullWidth value={start_date} name="start_date" id="outlined-basic" label="접수시작" variant="outlined" onChange={onChangeStartDate}/>
            <TextField fullWidth value={end_date}name="end_date" id="outlined-basic" label="접수마감" variant="outlined" onChange={onChangeEndDate}/>
            <TextField fullWidth value={company_name} name="company_name"  id="outlined-basic" label="회사이름" variant="outlined" onChange={onChangeCompanyName}/>
            <TextField fullWidth value={work_area} name="work_area"  id="outlined-basic" label="근무지역" variant="outlined" onChange={onChangeWorkArea}/>
            <TextField fullWidth value={work_field} name="work_field" id="outlined-basic" label="채용분야" variant="outlined" onChange={onChangeWorkField}/>
            <TextField fullWidth value={work_condition} name="work_condition"  id="outlined-basic" label="자격요건" variant="outlined"onChange={onChangeCondition} />
            </> 
            :
            <>
            <TextField fullWidth name="start_date" id="outlined-basic" label="접수시작" variant="outlined" onChange={onChangeStartDate}/>
            <TextField fullWidth name="end_date" id="outlined-basic" label="접수마감" variant="outlined" onChange={onChangeEndDate}/>
            <TextField fullWidth name="company_name"  id="outlined-basic" label="회사이름" variant="outlined" onChange={onChangeCompanyName}/>
            <TextField fullWidth name="work_area"  id="outlined-basic" label="근무지역" variant="outlined" onChange={onChangeWorkArea}/>
            <TextField fullWidth name="work_field" id="outlined-basic" label="채용분야" variant="outlined" onChange={onChangeWorkField}/>
            <TextField fullWidth name="work_condition"  id="outlined-basic" label="자격요건" variant="outlined"onChange={onChangeCondition} />
            </>
            }
            </div>
         
        }
        </>
      }
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt="preview-img"
            style={{ height: "50px", padding: "10px" }}
            onClick={onClickImg}
          />
        )}
        <TextField
          name="contents"
          style={{ display: "flex", padding:"13px", flex: "1" }}
          multiline
          rows={5}
          placeholder="나누고 싶은 이야기가 있으신가요?"
          variant="outlined"
          onChange={onChangeContent}
          value={contents}
        ></TextField>
      </div>

      {/* <FeedModalHashtags hashArr={hashArr} setHashArr={setHashArr} /> */}

      <div className="hashDivrap">
      <div className="HashWrap" style={{marginLeft:"20px"}}>
        <div className="HashWrapOuter"></div>
        <input
          className="HashInput"
          type="text"
          value={hashtag}
          onChange={onChangeHashtag}
          onKeyUp={onKeyUp}
          placeholder="해시태그 입력"
        />
      </div>
    </div>


      <div className="FeedModalContents">
        <div className="FeedModalContents__bottom">
          <div className="FeedModalContents__option" onClick={onClickImgBtn}>
            <ButtonBase variant="contained" component="label">
            <form name="myform" encType="multipart/form-data">
              <input
                name="filename"
                type="file"
                hidden
                onChange={(e) => encodeFileToBase64(e.target.files[0])}
              />
              </form>
              <YardOutlinedIcon style={{ color: "#61b3ff" }} />
              &nbsp;&nbsp;사진
            </ButtonBase>
          </div>
          
          {/* <div className="FeedModalContents__option" onClick={onClickVideoBtn}>
            <ButtonBase variant="contained" component="label">
              <input
                type="file"
                hidden
                accept="img/*"
                onChange={(e) => encodeFileToBase64(e.target.files[0])}
              />
              <SmartDisplayOutlinedIcon style={{ color: "#8ee673" }} />
              &nbsp;&nbsp;<h3>동영상</h3>
            </ButtonBase>
          </div> */}
          
          <div style={{ position: 'relative' }}>
            <div className="FeedModalContents__option" onClick={onClickEmoji}>
              <ButtonBase variant="contained" component="label">
                <AddReactionOutlinedIcon style={{ color: "orange" }}  />
                &nbsp;&nbsp;이모티콘
              </ButtonBase>
            </div>
            { showSelector ? (
              <div style={{zIndex:'9999', position: 'absolute', top:'-360px', left:'-50%' }}>
              <SlackSelector onSelect={ handleSelect}/>
              </div>
            ) : null }

          </div>


          <div className="FeedModalContents__option">
            <ButtonBase variant="contained" component="label" onClick={writeBtn}>
              <RateReviewOutlinedIcon style={{ color: "#fa81c0"}} />
              &nbsp;&nbsp;올리기
            </ButtonBase>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedModalContents;
