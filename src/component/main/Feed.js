import React, { Fragment, useCallback, useEffect, useState } from "react";
import "./Feed.css";
// import MessageSender from "./MessageSender";
import Post from "./Post";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import FeedPopupButton from "./FeedPopupButton";
import HashTagBox from "./HashTagBox";
import Modal from "./FeedModal";
import { Avatar } from "@material-ui/core";
import { useUserState } from "../member/UserContext";

function Feed({ keyword }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [empty, setEmpty] = useState(false);
  const [showHashtag, setShowHashtag] = useState(false);
  const [isPostChange, setIsPostChange] = useState(false);

  const { user } = useUserState();

  React.useEffect(() => {
    console.log("App----------", user);
  }, [user]);



  // 서버 통신 부분
  const getPosts = useCallback(async (page) => {
    setLoading(true);
    await axios
      .get(`http://localhost:9090/mainboard/list/${page}?keyword=${keyword}`)
      .then((res) => {
        //console.log(res);
        const newlist = res.data.list;
        if (newlist.length === 0) setEmpty(true);
        setPosts((prevState) => [...prevState, ...newlist]);
      })
      .catch((e) => {
        console.log(e);
      });      
    setLoading(false);
  }, [page, keyword]);

  // 테스트용
  // const getPosts = useCallback(async () => {
  //   setLoading(true);
  //   setPosts((prevState) => [...prevState, ...createBulkPosts()]);
  //   setLoading(false);
  // }, [page]);

 
  // posts 가 바뀔때마다 함수 실행
  useEffect(() => {
    getPosts(page);
  }, [getPosts]);

  // 사용자가 마지막 요소를 보고 있고,
  // 로딩 중이 아니라면,
  // 호출될 데이터가 있다면,
  useEffect(() => {
    console.log("infinite", inView, !loading, !empty, page);
    if (inView && !loading && !empty) {
      setPage((prevState) => prevState + 1);
      console.log("page", page);
    }
  }, [inView, loading, empty, page]);

  useEffect(() => {
    if (keyword !== "") {
      setShowHashtag(true);
      setPosts([]);
      setPage(1);
      setLoading(false);
      setEmpty(false);
      getPosts(1);
      window.onbeforeunload = function pushRefresh() {
        window.scrollTo(0, 0);
      };
    }
  }, [keyword]);

  
  // useEffect(() => {
  //    console.log('--------------------', isPostChange);
  //     setPosts([]);
  //     setPage(1);
  //     setLoading(false);
  //     setEmpty(false);
  //     getPosts(1);
  //     window.onbeforeunload = function pushRefresh() {
  //       window.scrollTo(0, 0);
  //     };
  // }, [isPostChange]);



  //! realtime connection
  //useEffect(() => {
  // db.collection("posts")
  //   .orderBy("timestamp", "desc")
  //   .onSnapshot((snapshot) =>
  //     setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
  //   );


  return (
    <div className="feed">
      {showHashtag && <HashTagBox keyword={keyword} />}


      <FeedPopupButton/>
      {posts.map(
        (
          post,
          idx
        ) => (
          <Fragment key={idx}>
            {posts.length - 1 === idx ? (
              <div ref={ref}>
                <Post
                 post={post}
                />
              </div>
            ) : (
              <Post
               post={post}
              />
            )}
          </Fragment>
        )
      )}
    </div>
  );
}

export default Feed;
