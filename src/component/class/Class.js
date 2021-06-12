
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight, FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';
import { useHistory } from 'react-router';
import example from './../../assets/images/example.jpg';

export function Class() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);
    const [createClass, setCreateClass] = useState({ nameClass: "", id: "" });
    const [allClass, setAllClass] = useState([{ id: "", code: "", name: "", id_lecturer: "", lecturer: "" }])
    const [classDel, setClassDel] = useState({ id: 0, idx: 0 });
    const [students, setStudents] = useState([{ id: "", name: "" }]);
    const [student, setStudent] = useState({
        id: "",
        email: "",
        telp: "",
        fullName: "",
        nickName: "",
        university: "",
        fields: "",
        placeBirth: "",
        dateBirth: "",
        gender: "",
        zipCode: "",
        address: ""
    })
    const history = useHistory();

    useEffect(() => {
        document.title = "Class | E-learning";
        setMenuActive("class");

        if (userLogin == null)
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
        document.querySelector('.bg-loading').classList.add('active');

        axios.post(`${url.api}class/create-class.php`, { nameClass: createClass.nameClass, id: userLogin.id }).then(
            (res) => {
                // console.log(res);
                readClass();
                document.querySelector('.bg-loading').classList.remove('active');
            }
        ).catch((err) => {
            console.log(err);
            document.querySelector('.bg-loading').classList.remove('active');
        })
    }

    const successCreate = () => {

    }

    const failedCreate = () => {

    }

    const handleDetail = (id, idx) => {
        axios.post(`${url.api}class/read-join-class.php`, { idClass: id, idUser: userLogin.id }).then(
            (res) => {
                setStudents(res.data.data);
            }
        ).catch((err) => {
            console.log(err);
        })

        setClassDel({
            id: id,
            idx: idx
        });

        $('.card-assignment-detail').addClass('active');
        $('.card-group').addClass('nano');
        $('.circle-book').addClass('active');
    }

    const handleClick = () => {
        document.querySelector('.modal').classList.add('active');
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
        document.querySelector('.bg-loading').classList.add('active');

        axios.post(`${url.api}class/delete-class.php`, { idClass: classDel.id }).then(
            (res) => {
                setClassDel({
                    id: 0,
                    idx: 0
                });
                readClass();
                document.querySelector('.bg-loading').classList.remove('active');
            }
        ).catch((err) => {
            console.log(err);
            document.querySelector('.bg-loading').classList.remove('active');
        })
        document.querySelector('.modal').classList.remove('active');
    }

    const handleView = (id) => {
        axios.post(`${url.api}class/read-studentDetail-class.php`, { idUser: id }).then(
            (res) => {
                setStudent(res.data.data)
            }
        ).catch((err) => {
            console.log(err);
        })

        document.querySelector('.modal-form').classList.add('active');
    }

    const handleCloseDetailStudent = () => {
        document.querySelector('.modal-form').classList.remove('active');
    }

    const handleDeleteStudent = (id) => {
        document.querySelector('.bg-loading').classList.add('active');
        
        axios.post(`${url.api}class/delete-student-class.php`, { idClass: classDel.id, idUser: id }).then(
            (res) => {
                // console.log(res);
                readClass();
                handleDetail(classDel.id, classDel.idx);
                document.querySelector('.bg-loading').classList.remove('active');
            }
        ).catch((err) => {
            console.log(err);
            document.querySelector('.bg-loading').classList.remove('active');
        })
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

            <div className="modal-form">
                <div className="form-box">
                    <h2>Student Detail</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis!</p>

                    <form className="form-biodata">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <h4>{student.email}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Telephone</label>
                                    <h4>{student.telp}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <h4>{student.fullName}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Nick Name</label>
                                    <h4>{student.nickName}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>University</label>
                                    <h4>{student.university}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Major</label>
                                    <h4>{student.fields}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Place of birth</label>
                                    <h4>{student.placeBirth}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Date of birth</label>
                                    <h4>{student.dateBirth}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <h4>{(student.gender == 1) ? 'Male' : 'Female'}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <h4>{student.zipCode}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Address</label>
                                    <h4>{student.address}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <button className="btn-download" type="button" onClick={handleCloseDetailStudent}>CLOSE</button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {/* Modal End */}

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
                                <h2>{allClass[classDel.idx].name}</h2>
                                <div className="information">
                                    <h5>{allClass[classDel.idx].lecturer}</h5>
                                    <h6>{allClass[classDel.idx].code}</h6>
                                </div>
                            </div>

                            <div className="skor" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ff7a57', fontSize: '24px'}}>
                                <FaTrashAlt style={{cursor: 'pointer'}} onClick={()=>handleClick()}/>
                            </div>
                        </div>
                    </div>

                    <div className="table-section">
                        <div className="content">
                            <div className="table-build">
                                <div className="table">
                                    <div className="table-head">
                                        <div className="th small">No</div>
                                        <div className="th">NRP</div>
                                        <div className="th">Name</div>
                                        <div className="th">Action</div>
                                    </div>

                                    <div className="table-body">

                                        {
                                            (students != null) ?
                                                students.map(function (el, idx) {
                                                    return (
                                                        <div className="row" key={idx}>
                                                            <div className="td small">{idx + 1}</div>
                                                            <div className="td">{el.id}</div>
                                                            <div className="td">{el.name}</div>
                                                            <div className="td">
                                                                <a onClick={() => handleDeleteStudent(el.id)} className="badge badge-danger">Delete</a>
                                                                <a onClick={() => handleView(el.id)} className="badge badge-primary">View</a>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="card-group">

                    {
                        (allClass != null) ?
                            allClass.map(function (el, idx) {
                                return (
                                    <div className="shadow" key={idx} onClick={() => handleDetail(el.id, idx)}>
                                        <div className="card">
                                            <div className="card-head">
                                                <div className="circle">{idx + 1}</div>
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



                </div>

                <div className="circle-book" id="mobile">
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}