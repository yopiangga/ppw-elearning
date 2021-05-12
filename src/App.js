
import React from "react";
import {
  HashRouter,
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import $ from 'jquery';

import './assets/css/css-reset.css';
import './assets/scss/desktop-style.css';
import './assets/scss/tablet-style.css';
import './assets/scss/mobileLandscape-style.css';
import './assets/scss/mobile-style.css';

import { Sidebar } from './component/sidebar/Sidebar';
import Navbar from './component/navbar/Navbar';
import { UserProvider } from "./pages/userContext";
import { Dashboard } from "./component/dashboard/Dashboard";
import { MyClass } from "./component/myClass/MyClass";
import { MyAssignment } from "./component/myAssignment/MyAssignment";
import { Profile } from "./component/profile/Profile";

function App() {

  const handleSidebar = () => {
      $('.sidebar').removeClass('active');
      $('.notifikasi').removeClass('active');
  }

  return (
    <UserProvider>
      <HashRouter>
        <div className="App">
          <Sidebar />
          <div className="body">
            <Navbar />
            <div className="body-content" onClick={handleSidebar}>
              <Switch>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/my-class" exact>
                  <MyClass />
                </Route>
                <Route path="/my-assignment" exact>
                  <MyAssignment />
                </Route>
                <Route path="/my-profile" exact>
                  <Profile />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
