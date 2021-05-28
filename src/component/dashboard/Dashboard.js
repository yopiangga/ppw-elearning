
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';
import { useHistory } from 'react-router';

export function Dashboard() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);
    const [cardDashboard, setCardDashboard] = useState({class: 0, assignment: 0, done: 0, nFinish: 0})
    const history = useHistory();

    useEffect(() => {
        if(userLogin == null)
            history.push('/login');

        document.title = "Home | E-learning";
        setMenuActive("home");

        reqUser();
    }, [])

    const reqUser = () => {
        axios.post(`${url.api}dashboard/user.php`, {idUser: userLogin.id}).then(
            (res) => {
                // console.log(res);
                setCardDashboard(res.data.data);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="dashboard">
            <div className="filter">

            </div>

            <div className="card-surat">

                <div className="card-group">

                    <div className="shadow">
                        <div className="card">
                            <div className="card-head">
                                <div className="circle">1</div>
                                <div className="icon">
                                    <FaLongArrowAltRight />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="left">
                                    <h4>My Class</h4>
                                    <h5></h5>
                                </div>
                                <div className="right">
                                    <h4>{cardDashboard.class}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shadow">
                        <div className="card">
                            <div className="card-head">
                                <div className="circle">2</div>
                                <div className="icon">
                                    <FaLongArrowAltRight />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="left">
                                    <h4>Total Assignment</h4>
                                    <h5></h5>
                                </div>
                                <div className="right">
                                    <h4>{cardDashboard.assignment}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shadow">
                        <div className="card">
                            <div className="card-head">
                                <div className="circle">3</div>
                                <div className="icon">
                                    <FaLongArrowAltRight />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="left">
                                    <h4>Done Assignment</h4>
                                    <h5></h5>
                                </div>
                                <div className="right">
                                    <h4>{cardDashboard.done}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shadow">
                        <div className="card">
                            <div className="card-head">
                                <div className="circle">4</div>
                                <div className="icon">
                                    <FaLongArrowAltRight />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="left">
                                    <h4>Not Finished</h4>
                                    <h5></h5>
                                </div>
                                <div className="right">
                                    <h4>{cardDashboard.nFinish}</h4>
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