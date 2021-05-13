import React, { useState, createContext, useEffect } from "react";
export const UserContext = createContext();

export const UserProvider = props => {

  const [menuActive, setMenuActive] = useState();
  const [url, setUrl] = useState({ api: ``, baseUrl: "" });

  const currentUser = JSON.parse(localStorage.getItem('userLogin'))
  const iniateUser = currentUser ? currentUser : null
  const [userLogin, setUserLogin] = useState(iniateUser); 

  // const [userLogin, setUserLogin] = useState({email: "", telp:""});
  
  useEffect( () => {
    setUrl({
      api: `http://localhost/semester2/ppw/uas/elearning-backend/`,
      baseUrl: `http://localhost/semester2/ppw/uas/elearning-backend/`
    })

  }, [])

  return (
    <UserContext.Provider value={[menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin]}>
      {props.children}
    </UserContext.Provider>
  );
};