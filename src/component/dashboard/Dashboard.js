
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

export function Dashboard() {

    const [menuActive, setMenuActive, url, setUrl] = useContext(UserContext);

    useEffect(() => {
        document.title = "Home | E-learning";
        setMenuActive("home");
        // axios.get(`https://api.quran.sutanlab.id/surah/`).then(
        //     (res) => {
        //         setSuratGroups(res.data.data);
        //     }
        // ).catch((err) => {
        //     console.log(err);
        // })
    }, [])

    const handleClick = (event) => {
        let id = event.target.id;
        $('#audio').stop();
        $('.card-surat-detail').addClass('active');
        $('.card-group').addClass('nano');
        $('.circle-book').addClass('active');

        // axios.get(`https://api.quran.sutanlab.id/surah/${id}`).then(
        //     (res) => {
        //         setSurat(res.data.data);
        //     }
        // ).catch((err) => {
        //     console.log(err);
        // })
    }

    const handleSurat = () => {
        $('.card-surat-detail').removeClass('active');
        $('.card-group').removeClass('nano');
        $('.circle-book').removeClass('active');
    }

    return (
        <div className="dashboard">
            <div className="filter">

            </div>

            <div className="card-surat">

                <div className="card-group">

                    <div className="shadow">
                        <div className="card">
                            <div className="card-head">
                                <div className="circle"></div>
                                <div className="icon" onClick={handleClick}>
                                    <FaLongArrowAltRight />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="left">
                                    <h4></h4>
                                    <h5></h5>
                                </div>
                                <div className="right">
                                    <h4></h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="circle-book" id="mobile" onClick={handleSurat}>
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}