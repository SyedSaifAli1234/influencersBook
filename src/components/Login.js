import image from "../images/login.jpg";
import logo from "../images/logo.svg";
import {socialMediaAuth, signIn} from "../service/FirebaseService";
import {facebookProvider, googleProvider, twitterProvider} from "../config/authMethods";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, sendEmailVerification} from "firebase/auth";
import Swal from 'sweetalert2'

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
                if(!resp.user.emailVerified) {
                    const auth = getAuth();
                    sendEmailVerification(auth.currentUser)
                        .then((res) => {
                            Swal.fire({
                                icon: 'info',
                                title: 'Email Confirmation Required',
                                text: 'Kindly verify your email via confirmation link sent to you.',
                            });
                        }).catch(err => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: err.message,
                            });
                    });
                } else {
                    sessionStorage.setItem("userName",resp.user.email);
                    navigate('/home');
                }
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                });
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
                                        <div className="form-group input-container">
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <p className="text-dark"> <b> link.tree/ </b></p>
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email address" ref={email} required style={{ paddingLeft: "85px"}}/>
                                        </div>
                                        <div className="form-group mb-4 input-container">
                                            <label htmlFor="password" className="sr-only">Password</label>
                                            <input type="password" name="password" id="password" className="form-control" placeholder="Password" ref={password} required/>
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
                                        <div className="row" onClick={()=>window.open('https://influencer.up.railway.app/redirect', 'firebaseAuth', 'height=315,width=400')}>
                                            <div className={"col-2 instagram btn"} style={{backgroundColor:"#be2596"}}>
                                                <i className="fa fa-instagram fa-fw"/>
                                            </div>
                                            <div className={"col-9 m-0 p-0"}>
                                                <span className="btn text-white" style={{backgroundColor:"#be2596"}}>
                                                    Login with Instagram
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
