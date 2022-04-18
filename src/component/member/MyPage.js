import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PersonOutline } from "@material-ui/icons";
import useInput from "./useInput";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDispatch, useUserState } from "./UserContext";
import { sendMypageReq, sendUpdateReq } from "./UserApi";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const theme2 = createTheme();

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const { user } = useUserState();

  const { user_id } = useParams();

  const [id, onChangeId, setId] = useInput("");
  const [pwd, onChangePwd, setPwd] = useInput("");
  const [confirmPwd, onChangeConfirmPwd, setConfirmPwd] = useInput("");

  const [user_name, onChangeName, setName] = useInput("");
  const [user_mail, onChangeEmail, setEmail] = useInput("");
  const [user_phone, onChangePhone, setPhone] = useInput("");
  const [user_address1, onChangeAddr1, setAddr1] = useInput("");
  const [user_address2, onChangeAddr2, setAddr2] = useInput("");
  const [user_business, onChangeBusiness, setBusiness] = useInput("");
  const [user_birth, onChangeBirth, setBrith] = useInput("");
  const [user_image1, onChangeImage1, setImage1] = useInput("");
  const [user_image2, onChangeImage2, setImage2] = useInput("");
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const MypageReq = async (user_id) => {
      const { info, result } = await sendMypageReq(user_id);

      console.log(info);

      if (result === "success") {
        setId(info.user_id);
        setName(info.user_name);
        setEmail(info.user_mail);
        setPhone(info.user_phone);
        setAddr1(info.user_address1);
        setAddr2(info.user_address2);
        setImage1(info.user_image1);
        setImage2(info.user_image2);
        setBrith(info.user_birth);
        setBusiness(info.user_business);
      } else {
        alert("서버 응답 에러");
      }
    };

    if (user.user_id === user_id) {
      MypageReq(user_id);
    } else {
      alert("로그인한 아이디와 일치하지 않습니다.");
    }
  }, []);

  const onModify = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("user_level", checked ? "1":"0");
    const res = await sendUpdateReq(data);

    console.log("[MyPage-onModify]", res);
    if (res.result === "success") {
      alert("회원정보 업데이트가 완료되었습니다.");

      dispatch({
        type: "MODIFY",
        // index: index,
        user_id: id,
        user_password: pwd,
      });

      navigate(`/`);
      window.location.reload(true);
    } else {
      alert("회원정보 업데이트 에러");
    }
  };

  // 사진 미리보기
  const encodeFileToBase64_1 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage1(reader.result);
        resolve();
      };
    });
  };

  const encodeFileToBase64_2 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage2(reader.result);
        resolve();
      };
    });
  };

  const clickLogoutBtn = () => {
    dispatch({
      type: "LOGOUT",
    });
    window.sessionStorage.clear();
    navigate(`/login`);
    //window.location.reload(true);
  };


  return (
    <ThemeProvider theme={theme2}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            마이페이지
          </Typography>
          <form name="myform" encType="multipart/form-data" onSubmit={onModify}>
            <div
              style={{
                padding: "100px 0px 0px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {user_image1 && (
                  <img
                    src={user_image1}
                    alt="preview-img"
                    style={{ height: "100px", padding: "10px" }}
                  />
                )}
                {!user_image1 && (
                  <Avatar
                    sx={{
                      m: 1,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <PersonOutline />
                  </Avatar>
                )}
              </div>
              <div>
                <Button variant="contained" component="label">
                  프로필사진 업로드
                  <input
                    id="file1"
                    name="file1"
                    type="file"
                    accept="img/*"
                    hidden
                    onChange={(e) => encodeFileToBase64_1(e.target.files[0])}
                  />
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "20px",
                fontFamily:'Poor Story'
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {user_image2 && (
                  <img
                    src={user_image2}
                    alt="preview-img"
                    style={{ height: "100px", padding: "10px" }}
                  />
                )}
                {!user_image2 && (
                  <Avatar
                    sx={{
                      m: 1,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <PersonOutline />
                  </Avatar>
                )}
              </div>
              <div>
                <Button variant="contained" component="label">
                  배경사진 업로드
                  <input
                    id="file2"
                    name="file2"
                    type="file"
                    accept="img/*"
                    hidden
                    onChange={(e) => encodeFileToBase64_2(e.target.files[0])}
                  />
                </Button>
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ readOnly: true }}
                  autoComplete="아이디"
                  name="user_id"
                  fullWidth
                  id="user_id"
                  label="아이디"
                  value={id}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_password"
                  label="비밀번호"
                  type="password"
                  id="user_password"
                  autoComplete="password"
                  value={pwd}
                  onChange={onChangePwd}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  autoComplete="cpassword"
                  value={confirmPwd}
                  onChange={onChangeConfirmPwd}
                  error={confirmPwd === pwd ? false : true}
                />
              </Grid>
              {confirmPwd === pwd ? (
                <p></p>
              ) : (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_name"
                  label="이름"
                  id="user_name"
                  autoComplete="name"
                  value={user_name}
                  onChange={onChangeName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_birth"
                  label="생년월일"
                  id="user_birth"
                  autoComplete="user_birth"
                  value={user_birth}
                  onChange={onChangeBirth}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_mail"
                  label="이메일"
                  id="user_mail"
                  autoComplete="email"
                  value={user_mail}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_phone"
                  label="전화번호"
                  id="user_phone"
                  autoComplete="phone"
                  value={user_phone}
                  onChange={onChangePhone}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_address1"
                  label="주소1"
                  id="user_address1"
                  autoComplete="address1"
                  value={user_address1}
                  onChange={onChangeAddr1}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_address2"
                  label="주소2"
                  id="user_address2"
                  autoComplete="address2"
                  value={user_address2}
                  onChange={onChangeAddr2}
                />
              </Grid>
              
              <Grid item xs={12}>
              <FormControlLabel control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': '기업' }}
              />
              } label="기업" />
              </Grid>
              {checked && <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_business"
                  label="사업자등록번호"
                  id="user_business"
                  autoComplete="user_business"
                  value={user_business}
                  onChange={onChangeBusiness}
                />
              </Grid>
              }
              
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              수정
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={clickLogoutBtn}
            >
              로그아웃
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MyPage;
