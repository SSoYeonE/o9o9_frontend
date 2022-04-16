import "./App.css";
import * as React from "react";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";
import MainPage from "./component/main/MainPage";
import Emoji from "./component/main/Emoji";
import LikeFolder from "./component/main/LikeFolder";
import Header from "./component/main/Header";
import OneToFifty from "./component/game/OneToFifty";
import Contentsview from "./component/main/Contentsview";
import MyPage from "./component/member/MyPage";
import SignUpPage from "./component/member/SignUpPage";
import LoginPage from "./component/member/LoginPage";
import { useUserState } from "./component/member/UserContext";
import CompanyProfile from "./component/company/CompanyProfile";
import CompanyProfileModify from "./component/company/CompanyProfileModify";
import ApplyList from "./component/company/ApplyList";
// import "bootstrap/dist/css/bootstrap.min.css";
import FollowingList from "./component/follow/followinglist/FollowingList";
import FollowerList from "./component/follow/followerlist/FollowerList";
import SearchList from "./component/follow/searchlist/SearchList";
function App1() {
  const { user } = useUserState();

  React.useEffect(() => {
    console.log("App----------", user);
  }, [user]);

  return (
    <>
      <Header />
      <div>
        <Routes>
          {user && (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<NoMatch />} />
              <Route path="/feed/hashtag/:keyword" element={<MainPage />} />
              <Route path="/emoji" element={<Emoji />} />
              <Route path="/likefolder" element={<LikeFolder />} />
              <Route path="/onetofifty" element={<OneToFifty />} />
              <Route path="/contents/:board_seq" element={<Contentsview />} />
              <Route path="company" element={<CompanyProfile />} />
              <Route path="company/modify" element={<CompanyProfileModify />} />
              <Route path="company/apply" element={<ApplyList />} />
              <Route path="mypage/:user_id" element={<MyPage />} />
              <Route path="/followinglist" element={<FollowingList/>}/>
		          <Route path="/followerlist" element={<FollowerList/>}/>
		          <Route path="/searchlist/:keyword" element={<SearchList/>}/>
            </>
          )}
          {!user && (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login" element={<LoginPage />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App1;
