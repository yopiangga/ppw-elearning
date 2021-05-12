import React, { useState, createContext, useEffect } from "react";
export const UserContext = createContext();

export const UserProvider = props => {

  const [menuActive, setMenuActive] = useState();
  const [url, setUrl] = useState({ api: ``, baseUrl: "" });
  const [lokasi, setLokasi] = useState({ latitude: 0, longitude: 0 });

  const geoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("browser anda jelek");
      localStorage.setItem("latitude", -6.175372);
      localStorage.setItem("longitude", 106.827194);
    }
  }

  const showPosition = (position) => {
    let data = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    localStorage.setItem("latitude", data.latitude);
    localStorage.setItem("longitude", data.longitude);
  }
  
  useEffect( () => {
    localStorage.setItem("latitude", -6.175372);
    localStorage.setItem("longitude", 106.827194);
    geoLocation();
  }, [])

  return (
    <UserContext.Provider value={[menuActive, setMenuActive, url, setUrl, lokasi, setLokasi]}>
      {props.children}
    </UserContext.Provider>
  );
};