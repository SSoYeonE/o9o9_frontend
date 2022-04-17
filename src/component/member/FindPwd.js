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
import { sendFindPwdReq, sendLoginReq } from "./UserApi";

const theme = createTheme();

function FindPwd() {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

  const [mail, onChangeMail, setMail] = useInput("");
  const [id, onChangeId, setId] = useInput("");

  const onFindPwd = async () => {
    if (!id || !mail) {
      alert("모든 값을 정확하게 입력해주세요");
      return;
    }
    const userInfo = { user_id: id, user_mail: mail };
    console.log("[비밀번호 찾기 정보]", userInfo);
    try {
      const data = await sendFindPwdReq(userInfo);
      const { result } = data;
      if (result !== "fail") {
        alert("비밀번호는 " + result + " 입니다.");
      } else {
        alert("비밀번호를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            비밀번호 찾기
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
              name="mail"
              label="이메일"
              type="text"
              id="mail"
              onChange={onChangeMail}
            />

            <Button
              onClick={onFindPwd}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              비밀번호 찾기
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  로그인하기
                </Link>
              </Grid>
              <Link href="/findid" variant="body2">
                아이디 찾기
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default FindPwd;
