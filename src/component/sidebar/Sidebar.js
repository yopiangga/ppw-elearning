import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import React, { useEffect } from 'react';
import { useContext } from 'react'
import logo from '../../assets/images/logo.png'
import { UserContext } from '../../pages/userContext'
import $ from 'jquery';

import { FaAngleLeft, FaBookmark, FaBookReader, FaCalendarCheck, FaMapSigns, FaMoneyCheckAlt, FaNewspaper, FaPray, FaPrayingHands, FaSchool, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

const handleMenu = () => {
    $('.sidebar').removeClass('active');
}

export function Sidebar() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    // useEffect(() => {
    //     if()
    //     document.querySelector('.App').classList.remove('hidden');
    //   })

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('userLogin') == null) {
            history.push('/login');
        }

    }, [])

    const handleSidebar = () => {
        $('.notifikasi').removeClass('active');
        $('.sidebar').removeClass('active');
    }

    const logout = () => {
        localStorage.clear();
        setUserLogin(null);
        document.querySelector('.App').classList.add('hidden');
        history.push('/login');
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
                    {
                        (userLogin.status == 2) ?
                            <li onClick={handleSidebar} className={menuActive == "assignment" ? "active" : ""}>
                                <Link to="/assignment" >
                                    <div className="icon"><FaBookmark /> </div>
                                    <h4>Assignment</h4>
                                </Link>
                            </li>
                            :
                            <div></div>
                    }

                    {
                        (userLogin.status == 3) ?
                            <li onClick={handleSidebar} className={menuActive == "myAssignment" ? "active" : ""}>
                                <Link to="/my-assignment" >
                                    <div className="icon"><FaBookmark /> </div>
                                    <h4>My Assignment</h4>
                                </Link>
                            </li>
                            :
                            <div></div>

                    }

                    <li onClick={handleSidebar} className={menuActive == "myProfile" ? "active" : ""}>
                        <Link to="/my-profile" >
                            <div className="icon"><FaUserCog /> </div>
                            <h4>My Profile</h4>
                        </Link>
                    </li>
                    <li onClick={logout} className={menuActive == "logout" ? "active" : ""}>
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
