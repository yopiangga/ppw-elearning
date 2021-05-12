
import { FaBars, FaCloudMoon, FaLongArrowAltUp, FaRegBell, FaRegTimesCircle } from 'react-icons/fa';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Navbar() {

    const [titlePage, setTitlePage] = useState({ first: "E-learning", last: "System" });

    const posisi = 10;

    const handleMenu = () => {
        $('.sidebar').toggleClass('active');
        $('.notifikasi').removeClass('active');
    }

    const handleNotifikasi = () => {
        $('.sidebar').removeClass('active');
        $('.notifikasi').toggleClass('active');
    }

    return (
        <div className="navbar">
            <div className="menu">
                <FaBars onClick={handleMenu} />
            </div>
            <h1>{titlePage.first} <span>{titlePage.last}</span></h1>
            <div className="icon" onClick={handleNotifikasi}>
                <div className="icon-bell">
                    <FaRegBell />
                    <div className="circle" style={(posisi == 10) ? {display: 'none'} : {display: 'flex'}}>1</div>
                </div>
            </div>
            <div className="notifikasi">
                <div className="triangle"></div>
                <div className="body-box">
                    <div className="notifikasi-head">
                        <h4>Reminder</h4>
                        <hr />
                    </div>
                    <div className="notifikasi-body">
                        <div className="item" style={(posisi == 10) ? {display: 'none'} : {display: 'flex'}}>
                            <div className="item-left">
                                <div className="box">
                                    <FaCloudMoon />
                                </div>

                            </div>
                            <div className="item-right">
                                <h5>Waktu Sholat </h5>
                                <h4>Jnsa</h4>
                            </div>
                        </div>

                        <div className="notifikasi-close">
                            <hr />
                            <div className="text" onClick={handleNotifikasi}>
                                <FaRegTimesCircle /> <h4>Close </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
