import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useInput from "./useInput";
import { useUserDispatch } from "./UserContext";
import { sendLoginReq } from "./UserApi";

const theme = createTheme();

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

  const [id, onChangeId, setId] = useInput("");
  const [pwd, onChangePwd, setPwd] = useInput("");

  const onLogin = async () => {
    if (!id || !pwd) {
      alert("모든 값을 정확하게 입력해주세요");
      return;
    }
    const userInfo = { user_id: id, user_password: pwd };
    console.log("[LoginPage-사용자정보]", userInfo);
    try {
      const data = await sendLoginReq({ user_id: id, user_password: pwd });
      const { result, user, msg } = data;
      alert(msg);
      if (result === "success") {
       // console.log("[LoginPage] 로그인 성공, 세션에 아이디 저장");
        window.sessionStorage.setItem("user_id", userInfo.user_id);
        window.sessionStorage.setItem("user_seq", user.user_seq);
        window.sessionStorage.setItem("user_level", user.user_level);

        /**
         *  user_id: window.sessionStorage.getItem("user_id"),
        user_seq: window.sessionStorage.getItem("user_seq"),
        user_level: window.sessionStorage.getItem("user_level"),
         */
        dispatch({
          type: "LOGIN",
          user_id: id,
          user_seq: user.user_seq,
          user_level: user.user_level,
        });

        navigate("/"); //  경로이동
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //  <div>
    // //   <div>
    // //     <img src="https://user-images.githubusercontent.com/95202440/163705922-b1ee824a-f175-4134-a239-d0c76b3a7ef6.png" style:></img>
    // //   </div>

    <div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: "100px 0px 0px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoFocus
              onChange={onChangeId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pwd"
              label="비밀번호"
              type="password"
              id="pwd"
              onChange={onChangePwd}
            />

            <Button
              onClick={onLogin}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인하기
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/findid" variant="body2">
                  아이디 찾기
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="/findpwd" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"회원가입하기"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>

  );
}

export default LoginPage;
