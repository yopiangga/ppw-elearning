import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../pages/userContext';

export function Profile() {
    
    const [user, setUser] = useState({email: "", telp: "", password1: "", password2: "", fullName: "", nickName: "", university: "", fields: "", placeBirth: "", dateBirth: "", gender: "", zipCode: "", address: ""});

    useEffect(() => {
        document.title = "My Profile | E-learning";
        setMenuActive("myProfile");
        axios.post(`${url.api}profile/read-profile.php`, { idUser: userLogin.id , status: userLogin.status}).then(
            (res) => {
                setUser(res.data.data[0]);
            }
        ).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleChange = (event) => {
        setUser({
            ...user, 
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${url.api}profile/update-profile.php`, {idUser: userLogin.id , status: userLogin.status, user: user}).then(
            (res) => {
                console.log(res);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="profile">
                <div className="form-section">
                    <div className="content">
                        <div className="form-box">
                            <h2>Edit Profile</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis!</p>

                            <form className="form-biodata" method="POST" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" name="email" id="email" value={user.email} readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Telephone</label>
                                            <input type="text" name="telp" id="telp" value={user.telp} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="password" name="password1" id="password1" value={user.password1} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Repeat Password</label>
                                            <input type="password" name="password2" id="password2" value={user.password2} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" name="fullName" id="fullName" value={user.fullName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Nick Name</label>
                                            <input type="text" name="nickName" id="nickName" value={user.nickName} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>University</label>
                                            <input type="text" name="university" id="university" value={user.university} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Fields</label>
                                            <input type="text" name="fields" id="fields" value={user.fields} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Place of birth</label>
                                            <input type="text" name="placeBirth" id="placeBirth" value={user.placeBirth} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Date of birth</label>
                                            <input type="date" name="dateBirth" id="dateBirth" value={user.dateBirth} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select name="gender" id="gender" onChange={handleChange} >
                                                <option value="1" >Male</option>
                                                <option value="2" >Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Zip Code</label>
                                            <input type="number" name="zipCode" id="zipCode" value={user.zipCode} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea name="address" id="address" cols="30" rows="4" value={user.address} onChange={handleChange} ></textarea>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Image Profile</label>
                                            <div className="box-profile">
                                                <label htmlFor="imgProfile" className="lblImgProfile">Image Upload</label>
                                                <input className="imgProfile" name="imgProfile" id="imgProfile" type="file"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <button className="btn-submit" name="submit" type="submit">UPDATE DATA</button>

                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}