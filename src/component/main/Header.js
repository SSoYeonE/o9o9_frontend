import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import FlagIcon from "@material-ui/icons/Flag";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import OneToFifty from "../game/OneToFifty";
import { Link } from 'react-router-dom'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { ConstructionOutlined } from "@mui/icons-material";
import SocialDistanceOutlinedIcon from '@mui/icons-material/SocialDistanceOutlined';
import { useUserState } from "../member/UserContext";
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';


function Header() {
  const { user } = useUserState();
  // const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log("App----------", user);
  }, [user]);
  // const user = {
  //   profilePic:
  //     "https://raw.githubusercontent.com/emilyoun/Facebook-Clone-with-REACT/main/Screen%20Shot%202021-01-02%20at%206.03.01%20PM.png",
  //   message: "WOW this works! ",
  //   timestamp: "This is a timestamp",
  //   username: "emilyoun",
  //   image:
  //     "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
  // };

 const [keyword, setKeyword] = useState("");
//  const dispatch = useUserDispatch();

//  const clickLogoutBtn = () => {
//   dispatch({
//     type: "LOGOUT",
//   });
//   window.sessionStorage.clear();
//   navigate(`/login`);
//   //window.location.reload(true);
// };

  const onClickFolder = () =>{
    navigate('/likefolder');
  }

  const onclickGame =()=>{
    navigate('../game/OneToFifty')
  }

  const onClickSearch = ()=>{
    navigate('/searchlist/'+keyword);
  }

  const onChangeKeyword = (e) => {
    console.log(e.target.value);
    setKeyword(e.target.value);
  }

  return (
    <div className="header">
      <div className="header__left" style={{marginTop:"13px"}}>
        {/* <img src="https://user-images.githubusercontent.com/95202440/161888309-c0244b0a-8965-44bc-ac1d-f40a6d31383e.png" alt="" width="100%" height="100px"/> &nbsp;&nbsp; */}
         
         <img src="https://user-images.githubusercontent.com/95202440/161996945-8a2c1c62-ae42-4840-a2bc-3f5b750acc78.png" alt="" width="100%" height="100px"/> &nbsp;&nbsp;
        
        <div className="header__center">
            <div className="header__input" style={{marginTop:"-3px",marginBottom:"8px"}}>
              <SearchIcon onClick={onClickSearch}/> <input onChange={onChangeKeyword} placeholder="Search" type="text" style={{width:"400px"}}/>
          </div>
        </div>
      </div> 

      {/* <div className="header__center">
          <div className="header__option">
          <HomeRoundedIcon style={{color:"#25d8de"}} fontSize="large"/>
          </div>
        </div>           */}
        {/* <div className="header__option">
          <FlagIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SubscriptionsOutlinedIcon fontSize="large" />
        </div>
        <div className="header__option">
          <StorefrontOutlinedIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SupervisedUserCircleIcon fontSize="large" />
        </div> */}
     
       {user &&
     <div className="header__right" >
        <IconButton>
        <Link to="/"> <HomeRoundedIcon style={{color:"#25d8de"}} fontSize="large"/></Link>
        </IconButton>

        <IconButton>
        <Link to={`/mypage/${user.user_id}`}><AccountCircleRoundedIcon style={{color:"#25d8de"}} fontSize="large"/></Link>
        </IconButton>

        <IconButton>
        <Link to={`/followinglist/${user.user_id}`}><SocialDistanceOutlinedIcon style={{color:"#25d8de"}} fontSize="large"/></Link>
        </IconButton>

        {/* <IconButton>
         <EmojiPeopleOutlinedIcon style={{color:"#25d8de"}} fontSize="large" onClick={clickLogoutBtn}/>
        </IconButton> */}

        <IconButton>
          <Link to="OneToFifty"><SmartToyOutlinedIcon style={{color:"#25d8de"}} fontSize="large"/></Link>
        </IconButton>


        </div>
        }
        {/*}<div className="header__info">
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div> */}
        {/* flip move with iconbutton  */}
        {/* <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <ForumIcon />
        </IconButton>
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton> 
        </div>*/}
    </div>
    
    
  );
}

export default Header;
