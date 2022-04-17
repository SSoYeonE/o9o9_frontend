import axios from "axios";

export const sendLoginReq = async (payload) => {
  console.log("[로그인 요청]", payload);
  const { data } = await axios.post(
    "http://127.0.0.1:9090/member/login_proc",
    payload
  );
  console.log("[로그인 응답]", data);
  return data;
};

export const sendMypageReq = async (payload) => {
  console.log("[UserApi-sendMypageReq]", payload);
  const { data } = await axios.get(
    `http://127.0.0.1:9090/member/mypage/${payload}`
  );
  console.log("[UserApi-sendMypageReq] 응답 데이터", data);
  return data;
};

export const sendUpdateReq = async (dto) => {
  console.log("[UserApi-sendUpdateReq]", dto);
  const { data } = await axios.post("http://127.0.0.1:9090/member/update", dto);
  console.log("[UserApi-sendUpdateReq] 응답 데이터", data);
  return data;
};

export const sendInsertReq = async (dto) => {
  console.log("[UserApi-sendInsertReq]", dto);
  const { data } = await axios.post("http://127.0.0.1:9090/member/insert", dto);
  console.log("[UserApi-sendInsertReq] 응답 데이터", data);
  return data;
};

export const sendFindIdReq = async (dto) => {
  console.log("[UserApi-sendFindIdReq]", dto);
  const { data } = await axios.post(
    "http://127.0.0.1:9090/member/findid_proc",
    dto
  );
  console.log("[UserApi-sendFindIdReq] 응답 데이터", data);
  return data;
};
export const sendFindPwdReq = async (dto) => {
  console.log("[UserApi-sendFindPwdReq]", dto);
  const { data } = await axios.post(
    "http://127.0.0.1:9090/member/findpass_proc",
    dto
  );
  console.log("[UserApi-sendFindPwdReq] 응답 데이터", data);
  return data;
};
