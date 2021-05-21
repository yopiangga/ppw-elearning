
import React, { useContext, useEffect, useState } from "react";
import {
  HashRouter,
  BrowserRouter,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import $ from 'jquery';

import './assets/css/css-reset.css';
import './assets/scss/desktop-style.css';
import './assets/scss/tablet-style.css';
import './assets/scss/mobileLandscape-style.css';
import './assets/scss/mobile-style.css';

import { Login } from './component/auth/Login';
import { Sidebar } from './component/sidebar/Sidebar';
import Navbar from './component/navbar/Navbar';
import { UserContext, UserProvider } from "./pages/userContext";
import { Dashboard } from "./component/dashboard/Dashboard";
import { MyClass } from "./component/myClass/MyClass";
import { MyAssignment } from "./component/myAssignment/MyAssignment";
import { Profile } from "./component/profile/Profile";
import { Assignment } from "./component/assignment/Assignment";
import { Register } from "./component/auth/Register";
import { Class } from "./component/class/Class";
import { CreateAssignment } from "./component/assignment/CreateAssignment";

function App() {

  // const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

  // const [status, setStatus] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('userLogin') == null)
      document.querySelector('.App').classList.add('hidden');
      else {
      document.querySelector('.App').classList.remove('hidden');
    }

  }, [])

  // const history = useHistory();

  const handleSidebar = () => {
    $('.sidebar').removeClass('active');
    $('.notifikasi').removeClass('active');
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="login-page">
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </div>
        <div className="App">
          <Sidebar />
          <div className="body">
            <Navbar />
            <div className="body-content" onClick={handleSidebar}>
              <Switch>
                <Route path="/dashboard" exact>
                  <Dashboard />
                </Route>
                <Route path="/my-class" exact>
                  <MyClass />
                </Route>
                <Route path="/class" exact>
                  <Class />
                </Route>
                <Route path="/my-assignment" exact>
                  <MyAssignment />
                </Route>
                <Route path="/assignment" exact>
                  <Assignment />
                </Route>
                <Route path="/create-assignment" exact>
                  <CreateAssignment />
                </Route>
                <Route path="/my-profile" exact>
                  <Profile />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider >
  );
}

export default App;
