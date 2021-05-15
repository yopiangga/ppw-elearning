
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

    const [assignment, setAssignment] = useState([{ title: "", classId: "", description: "", minRate: "", maxRate: "", dueTime: "", dueDate: "" }])
    const [assignmentNumber, setAssignmentNumber] = useState(0);
    const [assignmentDetail, setAssignmentDetail] = useState({ title: "", classId: "", description: "", minRate: "", maxRate: "", dueTime: "", dueDate: "" });

    useEffect(() => {
        document.title = "Assignment | E-learning";
        setMenuActive("assignment");

        axios.post(`${url.api}assignment/read-assignment.php`, { idUser: userLogin.id }).then(
            (res) => {
                // console.log(res);
                setAssignment(res.data.data);
                // history.push('/assignment');
            }
        ).catch((err) => {
            console.log(err);
        })

    }, [])

    const history = useHistory();

    const handleClick = (idx) => {
        $('#audio').stop();
        $('.card-assignment-detail').addClass('active');
        $('.card-group').addClass('nano');
        $('.circle-book').addClass('active');

        setAssignmentNumber(idx);
        setAssignmentDetail(assignment[idx]);
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

    return (
        <div className="dashboard">
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
                                    <h5>{assignmentDetail.classId}</h5>
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
                                <button>Edit Assignment</button>
                            </form>
                        </div>
                    </div>


                    <div className="table-section">
                        <div className="content">
                            <div className="table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="rank">No</th>
                                            <th>NRP</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                            <th className="skor">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>1</th>
                                            <td>3120600001</td>
                                            <td>aa</td>
                                            <td>bb</td>
                                            <td className="skor">
                                                <a href="" className="badge badge-danger">Delete</a>
                                                <a href="" className="badge badge-primary">Rate</a>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
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
                                            <div className="circle">{idx+1}</div>
                                            <div className="icon" onClick={() => handleClick(idx)}>
                                                <FaLongArrowAltRight />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="left">
                                                <h4>{el.title}</h4>
                                                <h5>{el.classId} <span>{el.dueDate}</span></h5>
                                            </div>
                                            <div className="right" style={{display: 'none'}}>
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