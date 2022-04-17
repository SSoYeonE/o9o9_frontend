import React, { useCallback, useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Box } from "@material-ui/core";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NearMeIcon from "@material-ui/icons/NearMe";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { AvatarGroup, Button, TextField } from "@mui/material";
import "./Feed.css";
import PostReply from "./PostReply";
import { Link } from "react-router-dom";
import {  SlackSelector,
          FacebookSelector,
          FacebookCounter } from 'react-reactions';
import icons from "../helpers/icons";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import FacebookCounterReaction from "../facebook/FacebookCounterReaction";
import FeedPopupButton from './FeedPopupButton'
import "./FeedModal";
import Facebook from "./Facebook";
import _ from 'lodash';
import axios from "axios";
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import Modal from "./FeedModal";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useUserState } from "../member/UserContext";


const initialState = {
  counters: [{
    emoji: 'like',
    by: 'Case Sandberg',
  }, {
    emoji: 'like',
    by: 'Henry Boldizsar',
  }, {
    emoji: 'like',
    by: 'Joseph Poon',
  }, {
    emoji: 'like',
    by: 'Elizabeth Stark',
  }, {
    emoji: 'like',
    by: 'Cameron Gillard',
  }, {
    emoji: 'love',
    by: 'Rob Sandberg',
  }],
  user: 'Case Sandberg',
  showSelector: false,
}
//                 setIsPostChange={setIsPostChange}

function Post2({post, setIsPostChange, isPostChange}) {
  const {mboard_seq, user_image1, contents_url, user_name, timestamp, contents, hashtag, user_seq, posting_type,
    jobposting_seq, start_date, end_date, company_name, work_area, work_field, work_condition} = post

  const jobpost = [start_date, end_date, company_name, work_area, work_field, work_condition];
  const jobpostlist = ["접수시작", "접수마감","회사명","회사위치","모집분야","채용조건"];

  console.log("user_image------------>"+user_image1);

  const [state, setState]= useState(initialState);
  const [empty, setEmpty] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [replys, setReplys] = useState([]);
  const [reply, setReply] = useState();
  const [fbemoji,setFBemoji] = useState("");
  const [ment, setMent] = useState("추천");
  const handleAdd = () => setState({ showSelector: true })
  const [del,setDel]=useState(); 
  const [copyadd,setCopyadd] = useState("");

  const { user } = useUserState();

  React.useEffect(() => {
    console.log("App----------", user);
  }, [user]);


  const onChangeUserMent = (e) => {
    setReply(e.target.value);
  }
  const onclickApply = (() =>{
    alert("지원되셨습니다. 잘되실거에요:)");
  });



  useEffect(()=>{

    console.log('post-------------', post);
    console.log('isPostChange-------------', isPostChange);
    setFBemoji(icons.find("facebook", "like"));
    var frmLikeData = new FormData();
    frmLikeData.append("mboard_seq",mboard_seq);
    frmLikeData.append("user_seq",user_seq);

    axios 
    .post(`http://localhost:9090/like/view/`, frmLikeData)
    .then((res) => {
      console.log(res.data);
      setFBemoji(icons.find("facebook", res.data.emoji));       
     // console.log("replys-----", replys);
    })
    .catch((e) => {
     // console.log(e);
    });

  


  },[])

 

  const getReplys = useCallback( () => {
    axios 
      .get(`http://localhost:9090/reply/list/${mboard_seq}`)
      .then((res) => {
        //console.log(res);
        setReplys(res.data);
       // console.log("replys-----", replys);
      })
      .catch((e) => {
       // console.log(e);
      });
  }, []);


// 수정하기
  const onClickModify=(mboard_seq)=>{
    openModal();
    // axios
    // .get(`http://localhost:9090/mainboard/delete/${mboard_seq}`)
    // .then((res)=>{
    //    setDel(res)
    //    console.log(del)
    //    setIsPostChange(!isPostChange);
    // })
    // .catch((e)=>{
    // });
  }
 
//삭제하기
  const onClickDel = (mboard_seq)=>{
    console.log(mboard_seq);
    axios
    .get(`http://localhost:9090/mainboard/delete/${mboard_seq}`)
    .then((res)=>{
      alert("삭제 완료!")
       setDel(res)
       console.log(del)
       window.location.reload(true);
       //setIsPostChange(!isPostChange);
    })
    .catch((e)=>{
    });
  }


//댓글달기  
  const onClickReplyBtn= () => {
    var frmData = new FormData();
    frmData.append("mboard_seq", mboard_seq);
    frmData.append("user_seq",user_seq);
    frmData.append("reply", reply);

    axios 
    .post(`http://localhost:9090/reply/insert`, frmData)
    .then((res) => {
     // console.log(res);
    setIsShow(true);
    getReplys();
    setReply("");
    })
    .catch((e) => {
     // console.log(e);
    });

    var frmLikeData = new FormData();
    frmLikeData.append("mboard_seq",mboard_seq);
    frmLikeData.append("user_seq",user_seq);
    frmLikeData.append("emoji","추천");

    axios 
    .post(`http://localhost:9090/like/insert`, frmLikeData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
    // console.log(e);
    });
  }

  let loadData=()=>{
    //console.log("------------------>",isShow);
    setIsShow(!isShow);
    getReplys();
  }
  const onClick = () => {
    loadData();
    //setReplys(res);
  };



 

  const handleSelect = (emoji) => {
  // const index = _.findIndex(state.counters, { by: state.user })
  // if (index > -1) {
  //   setState({
  //     counters: [
  //       ...state.counters.slice(0, index),
  //       { emoji, by: state.user },
  //       ...state.counters.slice(index + 1),
  //     ],
  //     showSelector: false,
  //   })
  // } else {
  //   setState({
  //     counters: [...state.counters, { emoji, by:state.user }],
  //     showSelector: false,
  //   })
  // }
    setFBemoji(icons.find("facebook", emoji)); 
    let tempMent='';

    if(emoji==='like') tempMent='추천~꾹!'
    if(emoji==='love') tempMent='좋아요'
    if(emoji==='haha') tempMent='하하하'
    if(emoji==='wow') tempMent='와~우!'
    if(emoji==='sad') tempMent='힝~'
    if(emoji==='angry') tempMent='@!#$$@#'
    setMent(tempMent);
    setState({ showSelector: false });

    
    var frmLikeData = new FormData();
    frmLikeData.append("mboard_seq",mboard_seq);
    frmLikeData.append("user_seq",user_seq);
    frmLikeData.append("emoji",emoji);

    axios 
    .post(`http://localhost:9090/like/update`, frmLikeData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
    // console.log(e);
    });

  }

  /*
          <option value={0}>일반글</option>
          <option value={1}>채용공고</option>
          <option value={2}>광고</option>
  */
  //}, []);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const user = {
  //   profilePic:
  //     "https://raw.githubusercontent.com/emilyoun/Facebook-Clone-with-REACT/main/Screen%20Shot%202021-01-02%20at%206.03.01%20PM.png",
  //   message: "WOW this works! ",
  //   timestamp: "This is a timestamp",
  //   username: "emilyoun",
  //   image:
  //     "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
  // };

 

  return (
    <>
    {
        <>
          <Modal post={post} open={modalOpen} close={closeModal} header="생각나누기" isPostChange={isPostChange} setIsPostChange={setIsPostChange}>
          <br/> 
          <Avatar src={post.user_image1} alt={post.user_name} style={{marginLeft:20}} />
          </Modal>
        </>
    }
      
      
    <div className="post">
      <div className="post__top">
        <Avatar src={user_image1} className="post__avatar" /> 
        <div className="post__topInfo">
          <h3>{user_name}</h3>
          {/* just use when you need to update time */}
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
          <p>{timestamp}</p>
         
          {posting_type==="1" && <p>{"채용공고"}</p>}
          {posting_type==="2" && <p>{"광고"}</p>}
        </div>

    </div>
      
      {contents_url && <div className="post__image" >
        <img src={contents_url} alt="" style={{width:"50%" ,height:"30%", textAlign:"center"}} />
      </div>} 
      
      <div className="post__bottom"  style={{marginTop:"10px"}}>
        <p style={{textAlign:"center"}}>{contents}</p>
        <div style={{textAlign:"center"}}>
        {
          jobposting_seq && (
        <>
          <p>{jobpostlist[0]} : {jobpost[0]}</p>
          <p>{jobpostlist[1]} : {jobpost[1]}</p>
          <p>{jobpostlist[2]} : {jobpost[2]}</p>
          <p>{jobpostlist[3]} : {jobpost[3]}</p>
          <p>{jobpostlist[4]} : {jobpost[4]}</p>
          <p>{jobpostlist[5]} : {jobpost[5]}</p>
          
          <div>
            <Button>
              <IosShareOutlinedIcon className="button" onClick={onclickApply} style={{float: "right", color:"#4fd3d8"}}/>
                지원하기
              </Button>
          </div>
          </>
          )
        }   

        </div>
        {/* 게시물 해시태그 링크 */}
        {hashtag.split("#").map((data) => (
          <Link style={{ paddingRight: 5 }} to={`/feed/hashtag/${data}`}>
            #{data}
          </Link>
        ))}
      </div>

     
    </div>
    </>
  );
}
         

//export default React.memo(Post);
export default Post2;
