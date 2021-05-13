import { useContext, useEffect } from "react";
import { UserContext } from '../../pages/userContext';


export function Profile() {
    const [menuActive, setMenuActive, url, setUrl] = useContext(UserContext);
    useEffect(() => {
        document.title = "My Profile | E-learning";
        setMenuActive("myProfile");
    }, [])

    return (
        <div className="profile">
                <div class="form-section">
                    <div class="content">
                        <div class="form-box">
                            <h2>Edit Profile</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis!</p>

                            <form class="form-biodata" method="POST">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" name="email" id="email" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Telephone</label>
                                            <input type="text" name="telp" id="telp" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>New Password</label>
                                            <input type="password" name="password1" id="password" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Repeat Password</label>
                                            <input type="password" name="password2" id="password" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>First Name</label>
                                            <input type="text" name="fname" id="fname" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Last Name</label>
                                            <input type="text" name="lname" id="lname" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>University</label>
                                            <input type="text" name="university" id="university" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Major</label>
                                            <input type="text" name="major" id="major" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Place of birth</label>
                                            <input type="text" name="placeBirth" id="placeBirth" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Date of birth</label>
                                            <input type="date" name="dateBirth" id="dateBirth" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Gender</label>
                                            <select name="gender" id="" id="gender">
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Zip Code</label>
                                            <input type="number" name="zipcode" id="zipcode" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea name="address" id="address" cols="30" rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label>Image Profile</label>
                                            <div class="box-profile">
                                                <label htmlfor="imgProfile" class="lblImgProfile">Image Upload</label>
                                                <input class="imgProfile" name="imgProfile" id="imgProfile" type="file"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button class="btn-submit" name="submit" type="submit">UPDATE DATA</button>

                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}