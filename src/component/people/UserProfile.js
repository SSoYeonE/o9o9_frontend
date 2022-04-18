import axios from "axios";
import { Link, useNavigate, useParams, Routes, Route, Outlet, NavLink } from "react-router-dom";
import React, { useState, useEffect} from "react";


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useUserState } from "../member/UserContext";

function User() {
  const { user } = useUserState();
  const {user_seq} = useParams();
  let history = useNavigate ();

  const [inputs, setInputs] = useState({
    user_name:'', 
    user_phone:'',
    user_birth:'',
    user_mail:'',
    user_image1:'',
    profile_short:'',
    profile_degree1:'',
    profile_degree2:'',
    profile_career:'',
    profile_certificate:'',
    profile_skill:'',
    profile_filename1:'',
    profile_filename2:'',
    profile_filename3:'',
    link1:"#none",
    lint2:"#none", 
    link3:"#none",
    profile_introduction:'',
  });

  const {     user_name, user_phone, user_birth, user_mail, user_image1, profile_short, 
  profile_degree1, profile_degree2, profile_career, profile_certificate,
  profile_skill, profile_filename1, profile_filename2, profile_filename3,
  profile_introduction, link1, link2, link3 } = inputs; 
  
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log(value, name);
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };


  useEffect(()=>{
    axios.get(`http://localhost:9090/profile/view/${user_seq}`)
    .then(
        res =>{
          if(res.data.profile_filename1!="")
            res.data.link1 ="http://localhost:9090/profile/download/image?file="+res.data.profile_filename1;
          if(res.data.profile_filename2!="")
          res.data.link2 ="http://localhost:9090/profile/download/image?file="+res.data.profile_filename2;
          if(res.data.profile_filename3!="")
          res.data.link3 ="http://localhost:9090/profile/download/image?file="+res.data.profile_filename3;
          
          setInputs(res.data);
      
          //alert("등록되었습니다.");
          //history('/board');
        } 
    );
  },[])

  const onSubmit=(e)=> {
    e.preventDefault();

    // Axios.post('http://localhost:9090/mongo/update/', obj)
    //      .then(res => console.log(res.data));
    // var frmData = new FormData(); 

    
    // frmData.append("file", document.myform.filename.files[0]);
    // axios.post('http://localhost:9090/board/insert/', frmData)
    // .then(
    //     res =>{
    //       console.log(res.data);
    //       alert("등록되었습니다.");
    //       history('/board');
    //     } 
    // );
  }


  const download = (filename) => {
    console.log(filename);
    //    @GetMapping("profile/download/image/{file}")
    // axio 로 호출


  axios.get('http://localhost:9090/profile/download/image?file=CompanyControlle(5).java')    
  .then(response =>{       
    console.log("filename-------->",filename);
   // FileSaver.saveAs(new Blob([response.data], {type:"text/plain;charset=utf-8"},filename      ));
  })                       


  }

  const updateProfileBtn = ()=>{
    history("/user/update");
  }

  return (
    <div style={{paddingTop:"120px"}}>
      <Container>
        {/* <Row> */}
          {/* <Col md="8"> */}
            <Card>
              <Card.Header>
                <Card.Title as="h4">프로필</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">
                  
                  <Row>
                  
                    <Col className="pr-1" >
                        <img src={user_image1} alt="이미지" style={{"width":"200px","height":"220px"}}/>
                    </Col>
                    
                    <Col className="pr-1">
                      <Row>
                        <Col className="px-1">
                          <Form.Group>
                            <label>이름</label>
                            <Form.Control
                              type="text" 
                              className="form-control" 
                              name="user_name"
                              value={user_name}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-1">
                          <Form.Group>
                            <label>전화번호</label>
                            <Form.Control
                              type="text" 
                              className="form-control" 
                              name="user_phone"
                              value={user_phone}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-1">
                          <Form.Group>
                            <label>메일주소</label>
                            <Form.Control
                              type="text" 
                              className="form-control" 
                              name="user_mail"
                              value={user_mail}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="pr-1">
                      <Row>
                        <Col className="px-1">
                        <Form.Group>
                          <label>생년월일</label>
                          <Form.Control
                            type="text" 
                            className="form-control" 
                            name="user_phone"
                            value={user_phone}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      </Row>
                      <Row>
                        <Col className="px-1">
                        <Form.Group>
                          <label>고등학교</label>
                          <Form.Control
                            type="text" 
                            className="form-control" 
                            name="profile_degree1"
                            value={profile_degree1}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      </Row>
                      <Row>
                        <Col className="px-1">
                        <Form.Group>
                          <label>대학교</label>
                          <Form.Control
                            type="text" 
                            className="form-control" 
                            name="profile_degree2"
                            value={profile_degree2}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      </Row>
                    </Col>
                     
                    
                  </Row>

                  <Row>
                    
                    <Col className="pl-1" >
                      <Form.Group>
                        <label>자기소개</label>
                        <Form.Control
                          type="text"
                          cols="80"
                          className="form-control" 
                          name="profile_short"
                          rows="4"
                          as="textarea"
                          value={profile_short}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" >
                      <Form.Group>
                        <label>경력사항</label>
                        <Form.Control
                          type="text"
                          cols="80"
                          className="form-control" 
                          name="profile_career"
                          rows="4"
                          as="textarea"
                          value={profile_career}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" >
                      <Form.Group>
                        <label>자격증</label>
                        <Form.Control
                          type="text"
                          cols="80"
                          className="form-control" 
                          name="profile_career"
                          rows="3"
                          as="textarea"
                          value={profile_career}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" >
                      <Form.Group>
                        <label>보유기술 및 etc</label>
                        <Form.Control
                          type="text"
                          cols="80"
                          className="form-control" 
                          name="profile_career"
                          rows="4"
                          as="textarea"
                          value={profile_career}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl-1" >
                      <Form.Group>
                        <label>포트폴리오1</label>
                        &nbsp;&nbsp;
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          variant="info"
                          
                        >
                         
                          
                         <a href={link1}>{profile_filename1}</a>
                         
                      </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" >
                    <Form.Group>
                        <label>포트폴리오2</label>
                        &nbsp;&nbsp;
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          variant="info"
                        

                        >
                        <a href={link2}>{profile_filename2}</a>
                      </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" >
                    <Form.Group>
                        <label>포트폴리오3</label>
                        &nbsp;&nbsp;
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          variant="info"
                          

                        >
                        <a href={link3}>{profile_filename3}</a>
                      </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>자기소개서</label>
                        <Form.Control
                          type="text"
                          cols="80"
                          className="form-control" 
                          name="profile_introduction"
                          rows="4"
                          as="textarea"
                          value={profile_introduction}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>


                  { user.user_seq === user_seq ? 
                    <Button
                      className="btn-fill pull-right"
                      type="button"
                      variant="info"
                      onClick={updateProfileBtn}
                    >
                      Update Profile
                    </Button> : <div></div>
                  }
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          {/* </Col> */}
       
        {/* </Row> */}
      </Container>
    </div>
  );
}

export default User;
