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
                                            <label for="">Email</label>
                                            <input type="email" value="" name="email" id="email" disabled />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Telephone</label>
                                            <input type="text" value="" name="telp" id="telp" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">New Password</label>
                                            <input type="password" value="" name="password1" id="password" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Repeat Password</label>
                                            <input type="password" value="" name="password2" id="password" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">First Name</label>
                                            <input type="text" value="" name="fname" id="fname" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Last Name</label>
                                            <input type="text" value="" name="lname" id="lname" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">University</label>
                                            <input type="text" value="" name="university" id="university" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Major</label>
                                            <input type="text" value="" name="major" id="major" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Place of birth</label>
                                            <input type="text" value="" name="placeBirth" id="placeBirth" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Date of birth</label>
                                            <input type="date" value="" name="dateBirth" id="dateBirth" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Gender</label>
                                            <select name="gender" id="" id="gender">
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="">Zip Code</label>
                                            <input type="number" value="" name="zipcode" id="zipcode" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Address</label>
                                            <textarea name="address" id="address" cols="30" rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="">Image Profile</label>
                                            <div class="box-profile">
                                                <label for="imgProfile" class="lblImgProfile">Image Upload</label>
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