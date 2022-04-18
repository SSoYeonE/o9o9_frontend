// import { Avatar } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchProfile from './SearchProfile';


// function List(props) {
//     const [page, setPage] = useState(1);
//     const [List, setList]=useState([]);
//     const [input, setInput] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const history = useNavigate();


//     const {profile} = props;

//     useEffect(()=>{
//         axios.get('http://localhost:9090/follow/followerlist?follower='+user)
//         .then( (res)=>{
//             console.log(res.data);
//             setList(res.data.list)
//         });
        

//     }, [page]);
//     // list
//     const onClick = ()=>{
//       alert(profile.user_level, profile.user_seq);
//       if(profile.user_level==="0"){
//         // 일반 사용자 프로필
//         // 우영님꺼
//         history('/');
//       } else {
//         history('/company/'+profile.user_seq);
//       }
//     }
//     return (
//         <div>
          
   
//             <div className="FeedPopupButton" onClick={onClick}>
//             <div className="FeedPopupButton__top">
//               <div>
//                 <Avatar src={profile.user_image1} alt={profile.user_name} />
                
//                 <input
//                   readOnly
//                   value={input}
//                   // onChange={(e) => setInput(e.target.value)}
//                   className="FeedPopupButton__input"
//                   placeholder={`${profile.user_name}, ${profile.profile_short}`}
//                 />
                
//               </div>  
//             </div> 
//           </div>    
 
//         </div>
//     );
// }

// export default List;