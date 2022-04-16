import { Avatar, Box } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from "axios";
import React from "react";

const onClickDelete = (reply_seq, getReplys) => {
  console.log(reply_seq);
  axios
    .get(`http://localhost:9090/reply/delete/${reply_seq}`)
    .then((res) => {
     console.log(res);
     getReplys();
    })
    .catch((e) => {
     console.log(e);
    });
    
}

const PostReply = ({ getReplys, reply_seq, profile_url, user_name, rdate, contents }) => {
  //console.log(user_name, contents);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          
          float: "left",
          width: "500px",
          border: "solid #e9e9e9 1px",
          backgroundColor: "#e9e9e9",
          margin: "0px 10px 10px 0px",
          padding: "6px",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        {/* <Avatar src={profile_url} />
        <Box sx={{ width: "100px", marginLeft: "10px" }}>{user_name}</Box>
          <div style={{float:"right", fontSize:"8px"}}> {rdate} </div> 
        <Box sx={{ width: "400px", marginLeft: "10px" }}>
          <Box> {contents} </Box>
          </Box>
      </Box> */}
    
        <Avatar src={profile_url} /> &nbsp;&nbsp;
          <Box sx={{ width: "100px" ,marginTop:"6px"}}>{user_name}</Box>
          <Box>
            <Box sx={{float:"right", fontSize:"8px"}}> {rdate} </Box> 
            <Box sx={{ width: "330px", marginTop:"6px" }}>{contents} </Box>
          </Box>
      </Box>

      <DeleteForeverOutlinedIcon  onClick={()=>onClickDelete(reply_seq, getReplys)}
        style={{ marginLeft: "5px", marginBottom: "12px", cursor: "pointer" }} />
       
    </Box>
  
  );
};

export default PostReply;
