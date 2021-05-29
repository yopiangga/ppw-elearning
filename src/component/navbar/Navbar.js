
import { FaBars, FaCloudMoon, FaLongArrowAltUp, FaRegBell, FaRegFileWord, FaRegTimesCircle, FaTasks } from 'react-icons/fa';
import $ from 'jquery';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../pages/userContext';
import { useHistory } from 'react-router';

export default function Navbar() {
    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);
    const [titlePage, setTitlePage] = useState({ first: "E-learning", last: "System" });
    const [assDoing, setAssDoing] = useState([{ title: "", class: "" }]);

    useEffect(() => {
        if(userLogin!=null){
            axios.post(`${url.api}navbar/user.php`, { idUser: userLogin.id }).then(
                (res) => {
                    // console.log(res);
                    setAssDoing(res.data.data);
                }
            ).catch((err) => {
                console.log(err);
            })
        }
    }, [])

    const history = useHistory();

    const handleMenu = () => {
        $('.sidebar').toggleClass('active');
        $('.notifikasi').removeClass('active');
    }

    const handleNotifikasi = () => {
        $('.sidebar').removeClass('active');
        $('.notifikasi').toggleClass('active');
    }

    const handleClickAss = () => {
        $('.sidebar').removeClass('active');
        $('.notifikasi').toggleClass('active');
        history.push('/my-assignment');
    }

    return (
        <div className="navbar">
            <div className="menu">
                <FaBars onClick={handleMenu} />
            </div>
            <h1>{titlePage.first} <span>{titlePage.last}</span></h1>
            {
                (userLogin != null) ?
                    <div className="icon" onClick={handleNotifikasi} >
                    {/* <div className="icon" onClick={handleNotifikasi} style={(userLogin.status != '2' || userLogin.status != '3') ? { display: 'none' } : { display: 'flex' }}> */}
                        <div className="icon-bell">
                            <FaRegBell />
                            <div className="circle" style={(assDoing == null || assDoing == 0) ? { display: 'none' } : { display: 'flex' }}>{assDoing.length}</div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
            <div className="notifikasi">
                <div className="triangle"></div>
                <div className="body-box">
                    <div className="notifikasi-head">
                        <h4>Reminder</h4>
                        <hr />
                    </div>
                    <div className="notifikasi-body">
                        {
                            (assDoing != null) ?
                                assDoing.map(function (el, idx) {
                                    return (
                                        <div className="item" key={idx} style={{ display: 'flex' }} onClick={handleClickAss}>
                                            <div className="item-left">
                                                <div className="box">
                                                    <FaRegFileWord />
                                                </div>

                                            </div>
                                            <div className="item-right">
                                                <h5>{el.title}</h5>
                                                <h4>{el.class}</h4>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div></div>
                        }

                        <div className="notifikasi-close">
                            <hr />
                            <div className="text" onClick={handleNotifikasi}>
                                <FaRegTimesCircle /> <h4>Close </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
