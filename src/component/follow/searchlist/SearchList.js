import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import SearchProfile from "./SearchProfile";


// {/* lowcase a to place h1 in centre, Capital A to align left */}

function SearchList() {
  const {keyword} = useParams();
  useEffect(() => {
 
  }, [keyword]);

  const [List, setList]=useState([]);

 

  useEffect(()=>{

    axios.get(`http://localhost:9090/member/search?keyword=${keyword}`)
      .then( (res)=>{
          console.log(res.data);
          setList(res.data.list)
      });
      

  }, []);
  // list
  return (
    // ? BEM naming convention
    <div className="app">
      <>
          <div className="app__body">
          <Profile />
          <div style={{display:"flex",   flexDirection: "column",   justifyContent: "center"}}>
          {
            List.map((profile)=> <SearchProfile profile={profile}/>)
          }
          </div>
        </div>
      </>
    </div>
  );
}

export default SearchList;
