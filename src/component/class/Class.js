
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight, FaRegTrashAlt } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';
import { useHistory } from 'react-router';

export function Class() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);
    const [createClass, setCreateClass] = useState({ nameClass: "", id: ""});
    const [allClass, setAllClass] = useState([{ id: "", code: "", name: "", id_lecturer: "", lecturer: "" }])
    const [classDel, setClassDel] = useState({id: 0, idx: 0});
    const history = useHistory();

    useEffect(() => {
        document.title = "Class | E-learning";
        setMenuActive("class");

        if(userLogin == null)
            history.push('/login');
        else {
            readClass();
        }
    }, [])

    const readClass = () => {
        axios.post(`${url.api}class/read-class.php`, { idUser: userLogin.id }).then(
            (res) => {
                setAllClass(res.data.data);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (event) => {
        setCreateClass({ ...createClass, [event.target.name]: event.target.value })
    }

    const handleCreateClass = (event) => {
        event.preventDefault();
        axios.post(`${url.api}class/create-class.php`, {nameClass: createClass.nameClass, id: userLogin.id}).then(
            (res) => {
                // console.log(res);
            }
        ).catch((err) => {
            console.log(err);
        })
        readClass();
    }

    const successCreate = () => {

    }

    const failedCreate = () => {

    }

    const handleClick = (id, idx) => {
        document.querySelector('.modal').classList.add('active');
        setClassDel({
            id: id,
            idx: idx
        });
    }

    const handleCancel = (event) => {
        document.querySelector('.modal').classList.remove('active');
        setClassDel({
            id: 0,
            idx: 0
        });
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.post(`${url.api}class/delete-class.php`, {idClass: classDel.id}).then(
            (res) => {
                console.log(res);
            }
        ).catch((err) => {
            console.log(err);
        })

        readClass();
        document.querySelector('.modal').classList.remove('active');
    }

    return (
        <div className="dashboard">
            <div className="modal">
                <div className="form">
                    <h2>Warning!</h2>
                    <p>Do you want to delete <span>{allClass[classDel.idx].name}</span> class ? </p>
                    <form className="form-biodata" method="POST">
                        <div className="btn">
                            <button className="btn-cancel" name="cancel" type="button" onClick={handleCancel}>CANCEL</button>
                            <button className="btn-submit" name="submit" type="submit" onClick={handleDelete}>DELETE</button>
                        </div>
                    </form>
                </div>
            </div>

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
                                <div className="shadow" key={idx} onClick={()=>handleClick(el.id, idx)}>
                                    <div className="card">
                                        <div className="card-head">
                                            <div className="circle">{idx+1}</div>
                                            <div className="icon">
                                                <FaRegTrashAlt />
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