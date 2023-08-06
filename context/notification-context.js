import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/notificationsReducer";

const initialState = {
  title: "Signing up...",
  message: "Registering for newsletter",
  status: "success", // success, error
};
const NotificatinContext = React.createContext();

export const NotificatinProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //show notificaitons
  const changeState = (title, message, status) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { title, message, status },
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
