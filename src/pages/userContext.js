import React, { useState, createContext, useEffect } from "react";
export const UserContext = createContext();

export const UserProvider = props => {

  const [menuActive, setMenuActive] = useState();
  const [url, setUrl] = useState({ api: `http://127.0.0.1:80/semester2/ppw/uas/elearning-backend/`, baseUrl: `http://127.0.0.1:80/semester2/ppw/uas/elearning-backend/` });

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