import React, { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  userList: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          user_id: action.user_id,
          user_seq: action.user_seq,
          user_level: action.user_level,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "MODIFY":
      return {
        ...state,
        user: {
          user_id: action.user_id,
          user_seq: action.user_seq,
          user_level: action.user_level,
        },
      };
    default:
      return state;
  }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (window.sessionStorage.getItem("user_id") != null) {
      dispatch({
        type: "LOGIN",
        user_id: window.sessionStorage.getItem("user_id"),
        user_seq: window.sessionStorage.getItem("user_seq"),
        user_level: window.sessionStorage.getItem("user_level"),
      });
    }
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find UserProvider");
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("Cannot find UserProvider");
  return dispatch;
};
