
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

export function Class() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    const [createClass, setCreateClass] = useState({ nameClass: "", id: userLogin.id });

    const [allClass, setAllClass] = useState([{ id: "", code: "", name: "", id_lecturer: "", lecturer: "" }])

    useEffect(() => {
        document.title = "Class | E-learning";
        setMenuActive("class");

        axios.post(`${url.api}class/read-class.php`, { idUser: userLogin.id }).then(
            (res) => {
                setAllClass(res.data.data);
            }
        ).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleChange = (event) => {
        setCreateClass({ ...createClass, [event.target.name]: event.target.value })
    }

    const handleCreateClass = (event) => {
        event.preventDefault();
        axios.post(`${url.api}class/create-class.php`, createClass).then(
            (res) => {
                console.log(res);
                // (res.data.msg == "Login Success!") ? 
                //     successCreate()
                //  :
                //     failedCreate()
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const successCreate = () => {

    }

    const failedCreate = () => {

    }

    return (
        <div className="dashboard">
            <h2>Create Class</h2>
            <div className="action">
                <form onSubmit={handleCreateClass} method="POST">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input type="text" value={createClass.nameClass} onChange={handleChange} name="nameClass" id="nameClass" placeholder="Name Class" />
                            </div>
                        </div>
                    </div>

                    <button type="submit">Create</button>
                </form>
            </div>

            <h2>My Class</h2>

            <div className="card-surat">

                <div className="card-surat-detail">
                    <div className="card">
                        <div className="card-head">
                            <h2></h2>
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

                    {
                        (allClass != null) ? 
                        allClass.map(function (el, idx) {
                            return (
                                <div className="shadow" key={idx}>
                                    <div className="card">
                                        <div className="card-head">
                                            <div className="circle">{idx+1}</div>
                                            <div className="icon">
                                                <FaLongArrowAltRight />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="left">
                                                <h4>{el.name}</h4>
                                                <h5>{el.lecturer}</h5>
                                            </div>
                                            <div className="right">
                                                <h4>{el.code}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div></div>
                    }

                    {/* <div className="shadow">
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
                    </div> */}

                </div>

                <div className="circle-book" id="mobile">
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}