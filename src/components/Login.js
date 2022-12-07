import image from "../images/login.jpg";
import logo from "../images/logo.svg";
import {socialMediaAuth, signIn} from "../service/FirebaseService";
import {facebookProvider, googleProvider} from "../config/authMethods";
import {useRef} from "react";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const handleSocialLogin = async (provider) => {
      const resp = await socialMediaAuth(provider);
      console.log(resp);
    }
    const loginHandler = async (event) => {
        event.preventDefault();
        const resp = await signIn(email?.current?.value, password?.current?.value);
        console.log(resp);
    }
    return (
        <>
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-5">
                                <img src={image} alt="login" className="login-card-img"/>
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <div className="brand-wrapper">
                                        <img src={logo} alt="logo" className="logo"/>
                                    </div>
                                    <p className="login-card-description">Sign into your account</p>
                                    <form onSubmit={(event)=>loginHandler(event)}>
                                        <div className="form-group">
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email address" ref={email} required/>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="password" className="sr-only">Password</label>
                                            <input type="password" name="password" id="password" className="form-control" placeholder="***********" ref={password} required/>
                                        </div>
                                        <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Login"/>
                                    </form>
                                    <a className="forgot-password-link" onClick={(e)=>e.preventDefault()}>Forgot password?</a>
                                    <p className="login-card-footer-text">Don't have an account? <a className="text-reset" onClick={(e)=>e.preventDefault()}>Register here</a></p>
                                    <nav className="login-card-footer-nav">
                                        <button onClick={()=>handleSocialLogin(googleProvider)}>Google</button>
                                        <button onClick={()=>handleSocialLogin(facebookProvider)}>Facebook</button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;