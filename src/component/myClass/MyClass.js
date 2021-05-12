
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

export function MyClass() {

    const [menuActive, setMenuActive, url, setUrl] = useContext(UserContext);

    useEffect(() => {
        document.title = "Class | E-learning";
        setMenuActive("myClass");
    }, [])

    return (
        <div className="dashboard">
            <h2>Join Class</h2>
            <div className="action">
                <form action="">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <input type="text" value="" name="codeClass" id="codeClass" placeholder="Code Class" />
                            </div>
                        </div>
                    </div>

                    <button>Join</button>
                </form>
            </div>

            <h2>My Class</h2>

            <div className="card-surat">

                <div className="card-surat-detail">
                    <div className="card">
                        <div className="card-head">
                            <h2> </h2>
                            <div className="text-arab">
                                <h1> </h1>
                            </div>
                        </div>
                        <div className="card-body">
                            <h4> </h4>
                            <p> </p>
                        </div>
                    </div>

                </div>

                <div className="card-group">

                    <div className="shadow">
                        <div className="card">
                            <div className="card-head">
                                <div className="circle"></div>
                                <div className="icon">
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

                <div className="circle-book" id="mobile">
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}