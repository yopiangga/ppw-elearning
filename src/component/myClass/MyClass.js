
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

export function MyClass() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    const [enroll, setEnroll] = useState({ codeClass: "" });
    const [myClass, setMyClass] = useState([{ id: "", code: "", name: "", nameLecturer: "" }]);

    useEffect(() => {
        document.title = "Class | E-learning";
        setMenuActive("myClass");

        reqClass();
    }, [])

    const reqClass = () => {
        axios.post(`${url.api}myClass/read-myClass.php`, { idUser: userLogin.id }).then(
            (res) => {
                setMyClass(res.data.data);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const handleChangeCode = (event) => {
        setEnroll({
            ...enroll,
            [event.target.name]: event.target.value
        })
    }

    const handleEnroll = (event) => {
        event.preventDefault();
        axios.post(`${url.api}myClass/enroll.php`, { codeClass: enroll.codeClass, idUser: userLogin.id }).then(
            (res) => {
                console.log(res);
            }
        ).catch((err) => {
            console.log(err);
        })
        
        reqClass();
    }

    return (
        <div className="dashboard">
            <h2>Join Class</h2>
            <div className="action">
                <form onSubmit={handleEnroll}>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input type="text" value={enroll.codeClass} name="codeClass" id="codeClass" placeholder="Code Class" onChange={handleChangeCode} />
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

                    {
                        (myClass != null) ? 
                        myClass.map(function (el, idx) {
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
                                                <h5>{el.nameLecturer}</h5>
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

                </div>

                <div className="circle-book" id="mobile">
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}