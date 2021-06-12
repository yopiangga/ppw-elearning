import { useContext, useState } from "react"
import axios from 'axios';
import { UserContext } from "../../pages/userContext";
import { useHistory } from "react-router";
import animation1 from '../../assets/images/animation-1.png';

export function Register() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    const [createUser, setCreateUser] = useState({ email: "", password: "", telp: "", status: "3"});

    const history = useHistory();

    const handleChange = (event) => {
        setCreateUser({ ...createUser, [event.target.name]: event.target.value });
    }

    const handleLogin = () => {
        history.push('/login');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        document.querySelector('.bg-loading').classList.add('active');
        axios.post(`${url.api}auth/register.php`, createUser).then(
            (res) => {
                document.querySelector('.bg-loading').classList.remove('active');
                (res.data.msg == "Sign Up Success!") ?
                    loginSuccess()
                    :
                    loginFailed()
            }
        ).catch((err) => {
            console.log(err);
            document.querySelector('.bg-loading').classList.remove('active');
        })
    }

    const loginSuccess = () => {
        history.push('/login');
    }

    const loginFailed = () => {
        setCreateUser({
            email: "", password: "", telp: ""   
        })
        history.push('/register');
    }

    return (
        <div className="login">
            <div className="login-left">
                <div className="content">
                    <h3>Petikdua</h3>
                    <h1>Get Started with Petikdua</h1>
                    <p>Start your account with special menu.</p>

                    <button className="btn-google"> <img src="https://img-authors.flaticon.com/google.jpg" alt="" /> Sign Up with Google</button>
                    <div className="choice-login">
                        <hr />
                        <h6>Or Sign Up Email</h6>
                        <hr />
                    </div>

                    <form onSubmit={handleSubmit} method="POST">
                        <div className="form-group">
                            <label>Email address</label>
                            <i className="fa fa-user"></i>
                            <input type="email" placeholder="example@petikdua.com" name="email" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <i className="fa fa-phone"></i>
                            <input type="text" placeholder="+62 823 3041 0865" name="telp" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder="min 6 character" name="password" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <i className="fa fa-user"></i>
                            <select name="status" id="" onChange={handleChange}>
                                <option disabled>Choose Status</option>
                                <option value="3">Student</option>
                                <option value="2">Lecturer</option>
                            </select>
                        </div>
                        <button className="btn-login" type="submit" name="submit">Register</button>

                        <h6>Have an Account? <a onClick={handleLogin}>Login</a></h6>
                    </form>
                </div>
            </div>
            <div className="login-right">
                <img src={animation1} alt="" />
                <h2>Designed for Learn Table</h2>
                <p>Lorem ipsum dolor sit amet. Incidunt debitis magnam, culpa a reiciendis molestiae laudantium facilis.</p>
            </div>
        </div>
    )
}