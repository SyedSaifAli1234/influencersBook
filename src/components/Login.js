import image from "../images/login.jpg";
import logo from "../images/logo.svg";
import {socialMediaAuth, signIn} from "../service/FirebaseService";
import {facebookProvider, googleProvider, twitterProvider} from "../config/authMethods";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const handleSocialLogin = (provider) => {
      socialMediaAuth(provider)
          .then(resp => {
              sessionStorage.setItem("userName",resp.email);
              navigate('/home');
          })
          .catch(err => {
              console.log(err);
          })
    }
    const loginHandler =  (event) => {
        event.preventDefault();
        signIn(email?.current?.value, password?.current?.value)
            .then(resp => {
                sessionStorage.setItem("userName",resp.user.email);
                navigate('/home');
            }).catch(err => {
                console.log(err);
            })
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
                                    <p className="login-card-footer-text">Don't have an account?
                                        <a className="text-reset ml-1" style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();navigate('/register')}}>Register here</a>
                                    </p>
                                    <a className="forgot-password-link" onClick={(e)=>e.preventDefault()}>Sign in with:</a>
                                    <div className="container">
                                        <div className="row" onClick={()=>handleSocialLogin(googleProvider)}>
                                            <div className={"col-2 google btn"}>
                                                <i className="fa fa-google fa-fw"/>
                                            </div>
                                            <div className={"col-9 m-0 p-0"}>
                                                <span className="google btn">
                                                    Login with Google+
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row" onClick={()=>handleSocialLogin(facebookProvider)}>
                                            <div className={"col-2 fb btn"}>
                                                <i className="fa fa-facebook fa-fw"/>
                                            </div>
                                            <div className={"col-9 m-0 p-0"}>
                                                <span className="fb btn">
                                                    Login with Facebook
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row" onClick={()=>handleSocialLogin(twitterProvider)}>
                                            <div className={"col-2 twitter btn"}>
                                                <i className="fa fa-twitter fa-fw"/>
                                            </div>
                                            <div className={"col-9 m-0 p-0"}>
                                                <span className="twitter btn">
                                                    Login with Twitter
                                                </span>
                                            </div>
                                        </div>
                                    </div>
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