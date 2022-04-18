
import React, { useState, useEffect} from "react";
import {  Link } from "react-router-dom";
import Axios from "axios";
import { useInView } from "react-intersection-observer"
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserState } from "../member/UserContext";

function ApplyList(props){
     const [board, setBoard] = useState([])
     const { user } = useUserState();

     React.useEffect(() => {
       console.log("App----------", user);
     }, [user]);
   
   

         /*
         useEffect( function, deps )
        - function : 수행하고자 하는 작업
        - deps : 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열
        화면불러올때 이 부분이 호출된다. 
        */
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
        // seq : 회사정보
        //values(#{jobposting_seq}, #{user_seq}, now(), #{com_seq}, #{cand_confirm});
        Axios.get('http://localhost:9090/apply/list?seq=' + user.user_seq)
        .then(res => {
          console.log(res.data)
          setBoard(...board, res.data.list);
        });
  
        //console.log( heroState.hero );
      }, []);
     
      
      return (
        <div style={{ paddingTop:"150px" }}>
          <h3 align="center">지원자 목록</h3>
          <table className="table table-striped" >
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>생년월일</th>
                <th>지원날짜</th>
              </tr>
            </thead>
            <tbody>
                 {
                    board.map(function(object, i){
                        return(
                          <tr key={i}>
                            <td>{i}</td>
                            <td>{object.user_name}</td>
                            <td>{object.user_birth}</td>
                            <td>{object.cand_date}</td>
                          </tr>   
                        )              
                    })
                 }                                                               
            </tbody>
          </table>
        </div>

      );
}


export default ApplyList;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/