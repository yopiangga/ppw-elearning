import { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { useHistory } from "react-router";
import { UserContext } from "../../pages/userContext";
import animation1 from '../../assets/images/animation-1.png';

export function Login() {

    const [menuActive, setMenuActive, url, setUrl, userLogin, setUserLogin] = useContext(UserContext);

    const [user, setUser] = useState({email: "", password: "", status: "3"});

    const history = useHistory();

    // useEffect(() => {
    //     document.querySelector('.App').classList.add('hidden');
    // })

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
        // console.log(user);
    }

    const handleRegister = () => {
        history.push('/register');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user);
        axios.post(`${url.api}auth/login.php`, user).then(
            (res) => {
                console.log(res);
                (res.data.msg == "Login Success!") ? 
                successLogin(res.data.data[0])
                 :
                 failedLogin()
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const successLogin = (data) => {
        let time = new Date().getTime() + (1000 * 60 * 60 * 2);
        localStorage.setItem('userLogin', JSON.stringify(data));
        setUserLogin(data);
        document.location.href = "/";
        // history.push('/');
    }

    const failedLogin = () => {
        setUser({email: "", password: "", status: ""})
        history.push('/login');
    }

    return (
        <div className="login">
            <div className="login-left">
                <div className="content">
                    <h3>Petikdua</h3>
                    <h1>Hi, Welcome Back!</h1>
                    <p>Start your account with special menu.</p>

                    <button className="btn-google"> <img src="https://img-authors.flaticon.com/google.jpg" alt="" /> Sign in with Google</button>
                    <div className="choice-login">
                        <hr />
                        <h6>Or Sign In Email</h6>
                        <hr />
                    </div>

                    <form onSubmit={handleSubmit} method="POST">
                        <div className="form-group">
                            <label>Email address</label>
                            <i className="fa fa-user"></i>
                            <input type="email" placeholder="example@petikdua.com" name="email" value={user.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder="min 6 character" name="password" value={user.password} onChange={handleChange}/>
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
                        <button className="btn-login" type="submit" name="submit">Login</button>

                        <h6>Not registered yet? <a onClick={handleRegister}>Create an Account</a></h6>
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