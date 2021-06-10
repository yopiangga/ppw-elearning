
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FaBookReader, FaCheck, FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from '../../pages/userContext';
import axios from 'axios';
import $, { data } from 'jquery';

import example from './../../assets/images/example.jpg';
import { useHistory } from 'react-router';

export function MyAssignment() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    const [ass, setAss] = useState([{
        id: "",
        title: "",
        className: "",
        description: "",
        minRate: "",
        maxRate: "",
        dueTime: "",
        dueDate: ""
    }])

    const [assDetail, setAssDetail] = useState({
        id: "",
        title: "",
        className: "",
        description: "",
        minRate: "",
        maxRate: "",
        dueTime: "",
        dueDate: ""
    })

    const [gambar, setGambar] = useState({});

    const [collect, setCollect] = useState([{
        id: "",
        idAssignment: "",
        createAt: "",
        updateAt: "",
        idStudent: ""
    }]);

    const history = useHistory();

    useEffect(() => {
        document.title = "Assignment | E-learning";
        setMenuActive("myAssignment");

        if(userLogin == null)
            history.push('/login');
        else {
            getAssignment();
        }
    }, [])

    const getAssignment = () => {
        axios.post(`${url.api}myAssignment/read-assignment.php`, { idUser: userLogin.id }).then(
            (res) => {
                setAss(res.data.data);
                // console.log(res);
                setCollect(res.data.collect);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const handleClick = (idx) => {
        $('#audio').stop();
        $('.card-assignment-detail').addClass('active');
        $('.card-group').addClass('nano');
        $('.circle-book').addClass('active');

        setAssDetail(ass[idx]);
    }

    // console.log(assDetail);
    // console.log(collect);

    const handleAssignment = () => {
        $('.card-assignment-detail').removeClass('active');
        $('.card-group').removeClass('nano');
        $('.circle-book').removeClass('active');
    }

    const handleSubmitAssignment = (event) => {
        event.preventDefault();
        document.querySelector('.bg-loading').classList.add('active');
        let formData = new FormData();
        formData.append('image', gambar);

        formData.append('idUser', userLogin.id);
        formData.append('idAss', assDetail.id);
        formData.append('title', assDetail.title);
        formData.append('className', assDetail.className);
        formData.append('description', assDetail.description);
        formData.append('minRate', assDetail.minRate);
        formData.append('maxRate', assDetail.maxRate);
        formData.append('dueTime', assDetail.dueTime);
        formData.append('dueDate', assDetail.dueDate);

        axios({
            url: `${url.api}myAssignment/submit-assignment.php`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then(
            (res) => {
                console.log(res);
                getAssignment();
                document.querySelector('.bg-loading').classList.remove('active');
            }
        ).catch((err) => {
            console.log(err);
            document.querySelector('.bg-loading').classList.remove('active');
        })

    }

    const handleChangeAssignemnt = (event) => {
        setGambar(event.target.files[0]);
    }

    const checkStatus = (id) => {
        var i, hasil;
        if (collect != null) {
            for (i = 0; i < collect.length; i++) {
                if (collect[i].idAssignment == id){
                    hasil = 1;
                    return(hasil);
                } else
                    hasil = 0;
            }
            return(hasil);
        }

    }

    const checkNilai = (id) => {
        var i, hasil;

        for (i = 0; i < collect.length; i++) {
            if (collect[i].idAssignment == id){
                hasil = collect[i].rate;
                return(hasil);
            } else
                hasil = 0;
        }
        return(hasil);
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
                                <h2>{assDetail.title}</h2>
                                <div className="information">
                                    <h5>{assDetail.className}</h5>
                                    <h6>{assDetail.dueTime} {assDetail.dueDate}</h6>
                                    {
                                        (checkStatus(assDetail.id) ?
                                            <div className="badge">
                                                <span> Completed </span>
                                                {
                                                    (checkNilai(assDetail.id) < 8/10 * assDetail.maxRate) ? 
                                                    <span>Remedial</span>
                                                    :
                                                    <span>Good</span>
                                                }
                                                
                                            </div>
                                            :
                                            <div></div>
                                        )
                                    }

                                </div>
                            </div>

                            <div className="skor">

                                {
                                    (checkStatus(assDetail.id) ?
                                        <h4>{checkNilai(assDetail.id)} / {assDetail.maxRate}</h4>
                                        :
                                        <h4>{assDetail.minRate} - {assDetail.maxRate}</h4>
                                    )
                                }
                            </div>
                        </div>
                        <div className="card-body">
                            <p>{assDetail.description}</p>
                        </div>
                        {
                            (checkStatus(assDetail.id) ?
                                <div></div>
                                :
                                <div className="card-action">
                                    <form onSubmit={handleSubmitAssignment} method="POST">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <div className="box-profile">
                                                        <label htmlFor="imgAssignment" className="lblImgProfile">File Upload</label>
                                                        <input className="imgProfile" name="imgAssignment" id="imgAssignment" type="file" onChange={handleChangeAssignemnt}></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button>Submit</button>
                                    </form>
                                </div>
                            )
                        }

                    </div>

                </div>

                <div className="card-group">

                    {
                        (ass != null) ?
                            ass.map(function (el, idx) {
                                return (
                                    <div className="shadow" key={idx}>
                                        <div className="card">
                                            <div className="card-head">
                                                <div className="circle">{idx + 1}</div>
                                                <div className="icon" onClick={() => handleClick(idx)} style={{color: '#01A765'}}>
                                                    {
                                                        checkStatus(el.id) ? <FaCheck /> : <FaLongArrowAltRight />
                                                    }
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="left">
                                                    <h4>{el.title}</h4>
                                                    <h5>{el.className} <span>{el.dueDate}</span></h5>
                                                </div>
                                                <div className="right" style={{ display: 'none' }}>
                                                    <h4></h4>
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

                <div className="circle-book" id="mobile" onClick={handleAssignment}>
                    <FaBookReader />
                </div>
            </div>
        </div>
    )
}