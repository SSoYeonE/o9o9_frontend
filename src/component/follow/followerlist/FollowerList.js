import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import List from"./List";


// {/* lowcase a to place h1 in centre, Capital A to align left */}

function FollowerList() {
  const params = useParams();
  useEffect(() => {
 
  }, [params.keyword]);


  // const [{ user }, dispatch] = useStateValue();
  // const user = null; // null to login page, string to show fb
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

export default FollowerList;
