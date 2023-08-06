import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/notificationsReducer";

const initialState = {
  title: "Signing up...",
  message: "Registering for newsletter",
  status: "pending", // success, error
  show: false,
};
const NotificatinContext = React.createContext();

export const NotificatinProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //show notificaitons
  const changeState = ({ title, message, status, show }) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { title, message, status, show },
    });
  };
  //hide notifications
  return (
    <NotificatinContext.Provider value={{ ...state, changeState }}>
      {children}
    </NotificatinContext.Provider>
  );
};
export const useNotificatinContext = () => {
  return useContext(NotificatinContext);
};
