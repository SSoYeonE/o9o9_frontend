import { Widgets } from "@material-ui/icons";
import React from "react";
import Feed from "./Feed";
import Header from "./Header";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import StoryReal from "./StoryReal";

const Main = () => {
  return (
    <>
      <Header />
      <div className="app__body">
        <Profile />
        <Feed />
      </div>
    </>
  );
};

export default Main;
