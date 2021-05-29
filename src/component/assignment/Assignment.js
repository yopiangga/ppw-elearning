
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

import example from './../../assets/images/example.jpg';
import { useHistory } from 'react-router';

export function Assignment() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin, createAssignment, setCreateAssignment] = useContext(UserContext);

    const [assignment, setAssignment] = useState([{ id: "", title: "", classId: "", className: "", description: "", minRate: "", maxRate: "", dueTime: "", dueDate: "" }])
    const [assignmentNumber, setAssignmentNumber] = useState(0);
    const [assignmentDetail, setAssignmentDetail] = useState({ id: "", title: "", classId: "", className: "", description: "", minRate: "", maxRate: "", dueTime: "", dueDate: "" });
    const [collectAss, setCollectAss] = useState([{
        idCollect: "",
        idStudent: "",
        name: "",
        rate: "",
        createAt: "",
        file: ""
    }])
    const [rate, setRate] = useState({idCollect: 0, rate: 0});
    const [idCollect, setIdCollect] = useState(0);

    useEffect(() => {
        document.title = "Assignment | E-learning";
        setMenuActive("assignment");

        if(userLogin == null)
            history.push('/login');
        else  {
            axios.post(`${url.api}assignment/read-assignment.php`, { idUser: userLogin.id }).then(
                (res) => {
                    setAssignment(res.data.data);
                }
            ).catch((err) => {
                console.log(err);
            })
        }

    }, [])

    const history = useHistory();

    const handleClick = (idx, id) => {
        $('#audio').stop();
        $('.card-assignment-detail').addClass('active');
        $('.card-group').addClass('nano');
        $('.circle-book').addClass('active');

        setIdCollect(id);
        setAssignmentNumber(idx);
        setAssignmentDetail(assignment[idx]);

        handleReqCollect(id);
    }

    const handleReqCollect = (id) => {
        axios.post(`${url.api}assignment/collect-assignment.php`, { idUser: userLogin.id, idAss: id }).then(
            (res) => {
                setCollectAss(res.data.data);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const handleAssignment = () => {
        $('.card-assignment-detail').removeClass('active');
        $('.card-group').removeClass('nano');
        $('.circle-book').removeClass('active');
    }

    const handleCreateAssignment = (event) => {
        event.preventDefault();
        history.push('/create-assignment');
    }

    const handleChangeAssignment = (event) => {
        setCreateAssignment({
            ...createAssignment,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeRate = (idCollect, idx) => {
        setRate({
            idCollect: idCollect,
            rate: collectAss[idx].rate
        })
        document.querySelector('.modal').classList.add('active');
    }

    const handleCancelRate = (event) => {
        document.querySelector('.modal').classList.remove('active');
    }

    const handleChange = (event) => {
        setRate({
            idCollect: rate.idCollect,
            rate: event.target.value
        })
    }

    const handleChangeSubmit = (event) => {
        event.preventDefault();
        axios.post(`${url.api}assignment/edit-rate-assignment.php`, rate).then(
            (res) => {
                handleReqCollect(idCollect);
            }
        ).catch((err) => {
            console.log(err);
        })
        document.querySelector('.modal').classList.remove('active');
    }

    const handleDeleteCollect = (id) => {
        axios.post(`${url.api}assignment/delete-collect-assignment.php`, {id: id}).then(
            (res) => {
                handleReqCollect(idCollect);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const handleView = (id) => {
        let url = collectAss[id].file;

        window.open(
            url,
            '_blank'
          );
    }

    const handleEditAssignment = () => {
        localStorage.setItem('CollectDetail', JSON.stringify(assignmentDetail));
        history.push('/edit-assignment');
    }

    return (
        <div className="dashboard">

            <div className="modal">
                <div className="form">
                    <h2>Form Rate</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga aliquid, molestiae.</p>
                    <form className="form-biodata" method="POST" onSubmit={handleChangeSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="">Rate</label>
                                    <input type="number" name="rate" value={rate.rate} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="btn">
                            <button className="btn-cancel" name="cancel" type="button" onClick={handleCancelRate}>BATAL</button>
                            <button className="btn-submit" name="submit" type="submit">KIRIM</button>
                        </div>

                    </form>
                </div>
            </div>

            <h2>Create Assignment</h2>
            <div className="action">
                <form onSubmit={handleCreateAssignment}>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input type="text" name="title" id="title" placeholder="Title Assignment" onChange={handleChangeAssignment} />
                            </div>
                        </div>
                    </div>

                    <button>Create</button>
                </form>
            </div>

            <h2>Assignment</h2>
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
                                <h2>{assignmentDetail.title}</h2>
                                <div className="information">
                                    <h5>{assignmentDetail.className}</h5>
                                    <h6>{assignmentDetail.dueTime} {assignmentDetail.dueDate}</h6>
                                </div>
                            </div>

                            <div className="skor">
                                <h4>{assignmentDetail.minRate} - {assignmentDetail.maxRate}</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <p>{assignmentDetail.description}</p>
                        </div>
                        <div className="card-action">
                            <form>
                                <button onClick={() => handleEditAssignment()}>Edit Assignment</button>
                            </form>
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
                                        <div className="th">Collection</div>
                                        <div className="th small">Rate</div>
                                        <div className="th">Action</div>
                                    </div>

                                    <div className="table-body">
                                                    {/* <div className="row">
                                                        <div className="td small">0</div>
                                                        <div className="td">2</div>
                                                        <div className="td">dhdkak</div>
                                                        <div className="td">ajad</div>
                                                        <div className="td small">100</div>
                                                        <div className="td">
                                                            <a href="" className="badge badge-danger">Delete</a>
                                                            <a onClick={handleChangeRate} className="badge badge-primary">Rate</a>
                                                        </div>
                                                    </div> */}

                                        {
                                            (collectAss != null) ? 
                                            collectAss.map(function (el, idx) {
                                                return (
                                                    <div className="row" key={idx}>
                                                        <div className="td small">{idx + 1}</div>
                                                        <div className="td">{el.idStudent}</div>
                                                        <div className="td">{el.name}</div>
                                                        <div className="td">{el.createAt}</div>
                                                        <div className="td small">{el.rate}</div>
                                                        <div className="td">
                                                            <a onClick={() => handleDeleteCollect(el.idCollect)} className="badge badge-danger">Delete</a>
                                                            <a onClick={() => handleChangeRate(el.idCollect, idx)} className="badge badge-primary">Rate</a>
                                                            <a onClick={() => handleView(idx)} className="badge badge-primary">View</a>
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
                        assignment.map(function (el, idx) {
                            return (
                                <div className="shadow" key={idx}>
                                    <div className="card">
                                        <div className="card-head">
                                            <div className="circle">{idx + 1}</div>
                                            <div className="icon" onClick={() => handleClick(idx, el.id)}>
                                                <FaLongArrowAltRight />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="left">
                                                <h4>{el.title}</h4>
                                                <h5>{el.classId} <span>{el.dueDate}</span></h5>
                                            </div>
                                            <div className="right" style={{ display: 'none' }}>
                                                <h4>{el.dueDate}</h4>
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