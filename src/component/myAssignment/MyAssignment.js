
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

import example from './../../assets/images/example.jpg';

export function MyAssignment() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    const [ass, setAss] = useState([{
        id: "",
        title: "",
        className: "",
        description: "",
        minRate: "",
        maxRate: "",
        dueTime: "",
        dueDate: ""
    }])

    const [assDetail, setAssDetail] = useState({
        id: "",
        title: "",
        className: "",
        description: "",
        minRate: "",
        maxRate: "",
        dueTime: "",
        dueDate: ""
    })

    useEffect(() => {
        document.title = "Assignment | E-learning";
        setMenuActive("myAssignment");

        axios.post(`${url.api}myAssignment/read-assignment.php`, { idUser: userLogin.id }).then(
            (res) => {
                setAss(res.data.data);
            }
        ).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleClick = (idx) => {
        $('#audio').stop();
        $('.card-assignment-detail').addClass('active');
        $('.card-group').addClass('nano');
        $('.circle-book').addClass('active');

        setAssDetail(ass[idx]);
    }

    const handleAssignment = () => {
        $('.card-assignment-detail').removeClass('active');
        $('.card-group').removeClass('nano');
        $('.circle-book').removeClass('active');
    }

    return (
        <div className="dashboard">
            <div className="filter">

            </div>

            <div className="card-assignment">

                <div className="card-assignment-detail">
                    <div className="card">
                    <div className="card-head">
                            <div className="img">
                                <div className="circle">
                                    <img src={example} alt="" />
                                </div>
                            </div>

                            <div className="title">
                                <h2>{assDetail.title}</h2>
                                <div className="information">
                                    <h5>{assDetail.classId}</h5>
                                    <h6>{assDetail.dueTime} {assDetail.dueDate}</h6>
                                </div>
                            </div>

                            <div className="skor">
                                <h4>{assDetail.minRate} - {assDetail.maxRate}</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <p>{assDetail.description}</p>
                        </div>
                        <div className="card-action">
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="box-profile">
                                                <label htmlFor="imgProfile" className="lblImgProfile">File Upload</label>
                                                <input className="imgProfile" name="imgProfile" id="imgProfile" type="file"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button>Submit</button>
                            </form>
                        </div>
                    </div>

                </div>

                <div className="card-group">

                    {
                        ass.map(function (el, idx) {
                            return (
                                <div className="shadow" key={idx}>
                                    <div className="card">
                                        <div className="card-head">
                                            <div className="circle">{idx+1}</div>
                                            <div className="icon" onClick={()=>handleClick(idx)}>
                                                <FaLongArrowAltRight />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="left">
                                                <h4>{el.title}</h4>
                                                <h5>{el.className} <span>{el.dueDate}</span></h5>
                                            </div>
                                            <div className="right" style={{display: 'none'}}>
                                                <h4></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="circle-book" id="mobile" onClick={handleAssignment}>
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}