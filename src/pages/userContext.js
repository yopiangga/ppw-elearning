import React, { useState, createContext, useEffect } from "react";
export const UserContext = createContext();

export const UserProvider = props => {

  const [menuActive, setMenuActive] = useState();
  const [url, setUrl] = useState({ api: `https://petikdua.store/elearning-backend/api/`, baseUrl: `https://petikdua.store/elearning-backend/` });

  const currentUser = JSON.parse(localStorage.getItem('userLogin'))
  const iniateUser = currentUser ? currentUser : null
  const [userLogin, setUserLogin] = useState(iniateUser); 

  const [createAssignment, setCreateAssignment] = useState({title: "", classId: "", description: "", minRate: "", maxRate: "", dueTime: "", dueDate: ""});

  return (
    <UserContext.Provider value={[menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin, createAssignment, setCreateAssignment]}>
      {props.children}
    </UserContext.Provider>
  );
};