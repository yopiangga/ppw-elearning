import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import React from 'react';
import { useContext } from 'react'
import logo from '../../assets/images/logo.png'
import { UserContext } from '../../pages/userContext'
import $ from 'jquery';

import { FaAngleLeft, FaBookmark, FaBookReader, FaCalendarCheck, FaMapSigns, FaMoneyCheckAlt, FaNewspaper, FaPray, FaPrayingHands, FaSchool, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

const handleMenu = () => {
    $('.sidebar').removeClass('active');
}

export function Sidebar() {

    const [menuActive, setMenuActive, url, setUrl] = useContext(UserContext);

    const handleSidebar = () => {
        $('.notifikasi').removeClass('active');
        $('.sidebar').removeClass('active');
    }

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} />
            </div>
            <div className="menu">
                <ul>
                    <li onClick={handleSidebar} className={menuActive == "home" ? "active" : ""}>
                        <Link to="/" >
                            <div className="icon"><FaBookReader /> </div>
                            <h4>Home</h4>
                        </Link>
                    </li>
                    <li onClick={handleSidebar} className={menuActive == "myClass" ? "active" : ""}>
                        <Link to="/my-class" >
                            <div className="icon"><FaSchool /> </div>
                            <h4>My Class</h4>
                        </Link>
                    </li>
                    <li onClick={handleSidebar} className={menuActive == "myAssignment" ? "active" : ""}>
                        <Link to="/my-assignment" >
                            <div className="icon"><FaBookmark /> </div>
                            <h4>My Assignment</h4>
                        </Link>
                    </li>
                    <li onClick={handleSidebar} className={menuActive == "assignment" ? "active" : ""}>
                        <Link to="/assignment" >
                            <div className="icon"><FaBookmark /> </div>
                            <h4>Assignment</h4>
                        </Link>
                    </li>
                    <li onClick={handleSidebar} className={menuActive == "myProfile" ? "active" : ""}>
                        <Link to="/my-profile" >
                            <div className="icon"><FaUserCog /> </div>
                            <h4>My Profile</h4>
                        </Link>
                    </li>
                    <li onClick={handleSidebar} className={menuActive == "logout" ? "active" : ""}>
                        <Link to="/logout" >
                            <div className="icon"><FaSignOutAlt /> </div>
                            <h4>Log Out</h4>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="menuHidden" id="mobile">
                <div className="circle" onClick={handleMenu}>
                    <FaAngleLeft />
                </div>
            </div>
        </div>
    )
}
