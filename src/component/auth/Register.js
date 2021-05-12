

export function Register(){
    return(
        <div class="login">
        <div class="login-left">
            <div class="content">
                <h3>Petikdua</h3>
                <h1>Get Started with Petikdua</h1>
                <p>Start your account with special menu.</p>

                <button class="btn-google"> <img src="https://img-authors.flaticon.com/google.jpg" alt="" /> Sign Up with Google</button>
                <div class="choice-login">
                    <hr />
                    <h6>Or Sign Up Email</h6>
                    <hr />
                </div>

                <form action="./insert/complete-data.php" method="POST">
                    <div class="form-group">
                        <label>Email address</label>
                        <i class="fa fa-user"></i>
                        <input type="email" placeholder="example@petikdua.com" name="email" />
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <i class="fa fa-phone"></i>
                        <input type="text" placeholder="+62 823 3041 0865" name="telp" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <i class="fa fa-lock"></i>
                        <input type="password" placeholder="min 6 character" name="password" />
                    </div>
                    <button class="btn-login" type="submit" name="submit">Register</button>

                    <h6>Have an Account? <a href="./login.php">Login</a></h6>
                </form>
            </div>
        </div>
        <div class="login-right">
            <img src="./assets/images/animation-1.png" alt="" />
            <h2>Designed for Learn Table</h2>
            <p>Lorem ipsum dolor sit amet. Incidunt debitis magnam, culpa a reiciendis molestiae laudantium facilis.</p>
        </div>
   </div>
    )
}