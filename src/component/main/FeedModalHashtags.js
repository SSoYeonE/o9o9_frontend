import "./FeedModalHashtags.css";
import React, { useCallback, useEffect, useState } from "react";

const FeedModalHashtags = ({ hashArr, setHashArr }) => {
  // onChange로 관리할 문자열
  const [hashtag, setHashtag] = useState("");
  // 해시태그를 담을 배열
  //const [hashArr, setHashArr] = useState([""]);

  const onChangeHashtag = (e) => {
    setHashtag(e.target.value);
  };

  // useEffect(() => {
  //   console.log(hashArr);
  // }, [hashArr]);

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
          //setHashArr(hashArr.filter((data) => data));
          console.log(hashArr.filter((data) => data));
          setHashArr(hashArr);
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

  useEffect(()=>{
    console.log("hashtag---------"+hashtag);
    console.log("hashArr---------"+hashArr);
  })

  return (
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
  );
};

export default FeedModalHashtags;
