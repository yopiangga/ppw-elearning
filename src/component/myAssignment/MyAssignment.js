
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

import example from './../../assets/images/example.jpg';

export function MyAssignment() {

    const [menuActive, setMenuActive, url, setUrl] = useContext(UserContext);

    useEffect(() => {
        document.title = "Assignment | E-learning";
        setMenuActive("myAssignment");
    }, [])

    const handleClick = (event) => {
        let id = event.target.id;
        $('#audio').stop();
        $('.card-assignment-detail').addClass('active');
        $('.card-group').addClass('nano');
        $('.circle-book').addClass('active');
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
                                <h2>bla bla bla</h2>
                                <div className="information">
                                    <h5>Mata kuliah</h5>
                                    <h6>18 June 2021</h6>
                                </div>
                            </div>

                            <div className="skor">
                                <h4>100/100</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, sit. Architecto in qui vitae eum, omnis aut dolorem quisquam, sapiente beatae minima voluptatem tenetur natus deserunt repellendus blanditiis facilis earum?</p>
                        </div>
                        <div className="card-action">
                            <form>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <div class="box-profile">
                                                <label htmlfor="imgProfile" class="lblImgProfile">File Upload</label>
                                                <input class="imgProfile" name="imgProfile" id="imgProfile" type="file"></input>
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

                <div className="circle-book" id="mobile" onClick={handleAssignment}>
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}