import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import List from"./List";
import axios from "axios";


// {/* lowcase a to place h1 in centre, Capital A to align left */}

function SearchList() {
  const {keyword} = useParams();
  useEffect(() => {
 
  }, [keyword]);


  // const [{ user }, dispatch] = useStateValue();
  // const user = null; // null to login page, string to show fb

  useEffect(()=>{
    // axio,, search controller
    // /member/search/
    axios.get(`http://localhost:9090/member/search/1?keyword=${keyword}`)
    .then( (res)=>{
        console.log(res.data);
        
    });
  }, [])
  return (
    // ? BEM naming convention
    <div className="app">
      <>
          <div className="app__body">
          <Profile />
          <List keyword={""} />
         {/* {params.keyword === undefined ? (
            <List keyword={""} />
          ) : (
            <List keyword={params.keyword} />
          )}
          */}
        </div>
      </>
    </div>
  );
}

export default SearchList;
