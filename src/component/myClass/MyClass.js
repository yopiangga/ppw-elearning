
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight, FaSignOutAlt } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';
import { useHistory } from 'react-router';

export function MyClass() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    const [enroll, setEnroll] = useState({ codeClass: "" });
    const [myClass, setMyClass] = useState([{ id: "", code: "", name: "", nameLecturer: "" }]);
    const [classExit, setClassExit] = useState({id: 0, idx: 0});

    const history = useHistory();

    useEffect(() => {
        document.title = "Class | E-learning";
        setMenuActive("myClass");

        if(userLogin == null)
            history.push('/login');
        else 
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

    const handleClick = (id, idx) => {
        document.querySelector('.modal').classList.add('active');
        setClassExit({
            id: id,
            idx: idx
        });
    }

    const handleCancel = (event) => {
        document.querySelector('.modal').classList.remove('active');
        setClassExit({
            id: 0,
            idx: 0
        });
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.post(`${url.api}myClass/exit-class.php`, {idClass: classExit.id, idUser: userLogin.id}).then(
            (res) => {
                console.log(res);
            }
        ).catch((err) => {
            console.log(err);
        })
        setClassExit({
            id: 0,
            idx: 0
        });
        reqClass();
        document.querySelector('.modal').classList.remove('active');
    }

    return (
        <div className="dashboard">
            <div className="modal">
                <div className="form">
                    <h2>Warning!</h2>
                    {
                        (myClass != null) ? <p>Do you want to delete <span>{myClass[classExit.idx].name}</span> class ? </p> : <p></p>
                    }
                    
                    <form className="form-biodata" method="POST">
                        <div className="btn">
                            <button className="btn-cancel" name="cancel" type="button" onClick={handleCancel}>CANCEL</button>
                            <button className="btn-submit" name="submit" type="submit" onClick={handleDelete}>DELETE</button>
                        </div>
                    </form>
                </div>
            </div>

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
                                            <div className="icon" onClick={()=>handleClick(el.id, idx)}>
                                                <FaSignOutAlt />
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