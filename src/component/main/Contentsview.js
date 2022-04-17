import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import Post2 from './Post2';



function Contentsview(props) {
    // const {mboard_seq, user_image1, contents_url, user_name, timestamp, contents, hashtag, user_seq, posting_type,
    //     jobposting_seq, start_date, end_date, company_name, work_area, work_field, work_condition} = post
    
    //   const jobpost = [start_date, end_date, company_name, work_area, work_field, work_condition];
    //   const jobpostlist = ["접수시작", "접수마감","회사명","회사위치","모집분야","채용조건"];
    const {mboard_seq} = useParams();

        
    // var frmLikeData = new FormData();
    // frmLikeData.append("mboard_seq",mboard_seq);
    // frmLikeData.append("user_seq",user_seq);
    // frmLikeData.append("emoji",emoji);

    // axios 
    // .post(`http://localhost:9090/like/update`, frmLikeData)
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((e) => {
    // // console.log(e);
    // });

  

    const [post, setPost] = useState({
        contents:"",
        mboard_seq:"",
        user_seq:"",
        user_image:"",
        user_name:"",
        wdate:"",
        contents:"",
        contents_url:"",
        view_yn:"",
        hashtag:"",
        posting_type:"",
        del_yn:"",
        like_seq:"" 
    });
    const [isLoading, setIsLoading] = useState(false);



   useEffect(()=>{

    
    axios
    .get(`http://localhost:9090/mainboard/view/`+ mboard_seq)
    .then((res) => {
          console.log(res.data);
          setPost({cotents: res.data.contents,
            mboard_seq : res.data.mboard_seq,
            user_seq : res.data.user_seq,
            user_image : res.data.user_image,
            user_name : res.data.user_name,
            wdate : res.data.wdate,
            contents : res.data.contents,
            contents_url : res.data.contents_url,
            view_yn : res.data.view_yn,
            hashtag : res.data.hashtag,
            posting_type : res.data.posting_type,
            del_yn : res.data.del_yn,
            like_seq : res.data.like_seq
        });
      
        setIsLoading(true);
    })
    .catch((e) => {
    // console.log(e);
    });

   }, []);

   useEffect(()=>{
    
    //console.log(post);
   },[post]);
   

    return (
       <>
        {/* <>{ isLoading === true ? <h3>{post.contents}</h3> : <div></div>}</> */}
        <div style={{padding: "150px 100px 100px 200px"}}>
        <Post2
         post={post}/>
        </div>
       </>
    );
    }

export default Contentsview;