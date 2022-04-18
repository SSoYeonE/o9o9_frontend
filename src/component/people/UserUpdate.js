import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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

function UserUpdate() {
  let history = useNavigate ();
  const { user } = useUserState();
  const [inputs, setInputs] = useState({
    user_name:'', 
    user_phone:'',
    user_birth:'',
    user_mail:'',
    profile_short:'',
    profile_degree1:'',
    profile_degree2:'',
    profile_career:'',
    profile_certificate:'',
    profile_skill:'',
    profile_filename1:'',
    profile_filename2:'',
    profile_filename3:'',
    profile_introduction:'',
  });

  const {     user_name, user_phone, user_birth, user_mail, profile_short, 
  profile_degree1, profile_degree2, profile_career, profile_certificate,
  profile_skill, profile_filename1, profile_filename2, profile_filename3,
  profile_introduction} = inputs; 
  
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log(value, name);
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };


  useEffect(()=>{
    const user_seq = user.user_seq;
    axios.get(`http://localhost:9090/profile/view/${user_seq}`)
    .then(
        res =>{
          console.log(res.data);
          setInputs(res.data);
          //alert("등록되었습니다.");
          //history('/board');
        } 
    );
  },[])

  const onSubmit=(e)=> {
    e.preventDefault();

    var frmData = new FormData(e.currentTarget); 
    frmData.append("user_seq", user.user_seq);

    axios.post('http://localhost:9090/profile/update', frmData)
    .then(
        res =>{
          console.log(res.data);
          alert("수정되었습니다.");
          history('/user/'+user.user_seq);
        } 
    );
  }


  const download = (filename) => {
    console.log(filename);
    //    @GetMapping("profile/download/image/{file}")
    // axio 로 호출
  }

 

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">프로필 수정</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">
                  <Row>
                    <Col className="pr-1">
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
                    <Col className="pl-1" >
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          이메일 주소
                        </label>
                        <Form.Control
                          type="text" 
                          className="form-control" 
                          name="user_mail"
                          value={user_mail}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1">
                      <Form.Group>
                        <label>생년월일</label>
                        <Form.Control
                          type="text" 
                          className="form-control" 
                          name="user_birth"
                          value={user_birth}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <label>고등학교</label>
                        <Form.Control
                          type="text" 
                          className="form-control" 
                          name="profile_degree1"
                          value={profile_degree1}
                          onChange={onChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>대학교</label>
                        <Form.Control
                          type="text" 
                          className="form-control" 
                          name="profile_degree2"
                          value={profile_degree2}
                          onChange={onChange}
                        ></Form.Control>
                      </Form.Group>
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
                          onChange={onChange}
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
                          onChange={onChange}
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
                          name="profile_certificate"
                          rows="3"
                          as="textarea"
                          value={profile_certificate}
                          onChange={onChange}
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
                          name="profile_skill"
                          rows="4"
                          as="textarea"
                          value={profile_skill}
                          onChange={onChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl-1" >
                      <Form.Group>
                        <label>포트폴리오1</label>
                        &nbsp;&nbsp;
                        <input
                          className="btn-fill pull-right"
                          type="file"
                          variant="info"
                          name="file1"
                        >
                      </input>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" >
                    <Form.Group>
                        <label>포트폴리오2</label>
                        &nbsp;&nbsp;
                        <input
                          className="btn-fill pull-right"
                          type="file"
                          variant="info"
                          name="file2"
                        >
                      </input>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" >
                    <Form.Group>
                        <label>포트폴리오3</label>
                        &nbsp;&nbsp;
                        <input
                          className="btn-fill pull-right"
                          type="file"
                          variant="info"
                          name="file3"
                        >
                      </input>
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
                          onChange={onChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </>
  );
}

export default UserUpdate;