import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../pages/userContext";

export function CreateAssignment() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin, createAssignment, setCreateAssignment] = useContext(UserContext);
    const [myClass, setMyClass] = useState([{id: "", code: "", name: "", idLecturer: ""}]);

    useEffect(() => {
        document.title = "Create Assignment | E-learning";
        setMenuActive("assignment");

        if(userLogin == null)
            history.push('/login');
        else {
            axios.post(`${url.api}class/read-class.php`, { idUser: userLogin.id }).then(
                (res) => {
                    setMyClass(res.data.data);
                }
            ).catch((err) => {
                console.log(err);
            })
        }
    }, [])

    const history = useHistory();

    const handleCreateAssignment = (event) => {
        event.preventDefault();
        document.querySelector('.bg-loading').classList.add('active');

        axios.post(`${url.api}assignment/create-assignment.php`, createAssignment).then(
            (res) => {
                // console.log(res);
                document.querySelector('.bg-loading').classList.remove('active');
                history.push('/assignment');
            }
        ).catch((err) => {
            console.log(err);
            document.querySelector('.bg-loading').classList.remove('active');
        })
    }

    const handleChangeAssignment = (event) => {
        setCreateAssignment({
            ...createAssignment,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="dashboard">
            <div className="filter">

            </div>
            <div className="bg-model">
                <div className="box-model">
                    <div className="form-section">
                        <div className="content">
                            <div className="form-box">
                                <h2>Create Assignment</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis!</p>

                                <form className="form-biodata" method="POST" onSubmit={handleCreateAssignment}>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input type="text" name="title" id="title" value={createAssignment.title}  onChange={handleChangeAssignment} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Class</label>
                                                <select name="classId" id="classId" onChange={handleChangeAssignment}>
                                                    {
                                                        myClass.map(function(el, idx){
                                                            return(
                                                                <option key={idx} value={el.id}>{el.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea name="description" id="description" cols="30" rows="4" onChange={handleChangeAssignment} value={createAssignment.description}></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Min Rate</label>
                                                <input type="number" name="minRate" id="minRate" value={createAssignment.minRate} onChange={handleChangeAssignment} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Max Rate</label>
                                                <input type="number" name="maxRate" id="maxRate" value={createAssignment.maxRate} onChange={handleChangeAssignment} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Time</label>
                                                <input type="time" name="dueTime" id="dueTime" value={createAssignment.dueTime} onChange={handleChangeAssignment} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Due Date</label>
                                                <input type="date" name="dueDate" id="dueDate" value={createAssignment.dueDate} onChange={handleChangeAssignment} />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn-submit" name="submit" type="submit">Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
