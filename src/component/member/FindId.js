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
import { sendFindIdReq, sendLoginReq } from "./UserApi";

const theme = createTheme();

function FindId() {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

  const [mail, onChangeMail, setMail] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [id, onChangeId, setId] = useInput("");

  const onFindId = async () => {
    if (!mail || !phone) {
      alert("모든 값을 정확하게 입력해주세요");
      return;
    }
    // 수정할 부분!!
    const userInfo = { user_mail: mail, user_phone: phone };
    console.log("[아이디 찾기 정보]", userInfo);
    try {
      const data = await sendFindIdReq(userInfo);
      const { result } = data;
      if (result !== "fail") {
        alert("아이디는 " + result + " 입니다.");
      } else {
        alert("아이디를 찾을 수 없습니다.");
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
            아이디 찾기
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mail"
              label="이메일"
              name="mail"
              autoFocus
              onChange={onChangeMail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="전화번호"
              type="text"
              id="phone"
              onChange={onChangePhone}
            />

            <Button
              onClick={onFindId}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              아이디 찾기
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  로그인하기
                </Link>
              </Grid>
              &nbsp;&nbsp;&nbsp;
              <Link href="/findpwd" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default FindId;
