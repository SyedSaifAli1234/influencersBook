import logo from "../images/logo.svg";
import {getUserByUserName, signIn, socialMediaAuth} from "../service/FirebaseService";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, sendEmailVerification} from "firebase/auth";
import Swal from 'sweetalert2'

const Login = () => {
    const userName = useRef();
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
        Swal.fire({
            title: 'Please wait...',
            html: '',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        getUserByUserName(userName?.current?.value,"users").then(resp => {
            resp.forEach((doc) => {
                signIn(doc.data().email, password?.current?.value)
                    .then(resp => {
                        if(!resp.user.emailVerified) {
                            const auth = getAuth();
                            sendEmailVerification(auth.currentUser)
                                .then((res) => {
                                    Swal.close();
                                    Swal.fire({
                                        icon: 'info',
                                        title: 'Email Confirmation Required',
                                        text: 'Kindly verify your email via confirmation link sent to you.',
                                    });
                                }).catch(err => {
                                Swal.close();
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: err.message,
                                });
                            });
                        } else {
                            Swal.close();
                            sessionStorage.setItem("userName",resp.user.email);
                            navigate('/home');
                        }
                    }).catch(err => {
                    Swal.close();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message,
                    });
                });
            });
        });
    }

    return (
        <>
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="brand-wrapper">
                                        <img src={logo} alt="logo" className="logo"/>
                                    </div>
                                    <p className="login-card-description">Sign into your account</p>
                                    <form onSubmit={(event)=>loginHandler(event)}>
                                        <div className="form-group input-container">
                                            <label htmlFor="userName" className="sr-only">userName</label>
                                            <p className="text-dark"> <b> link.tree/ </b></p>
                                            <input type="text" name="userName" id="userName" className="form-control" placeholder="Username" ref={userName} required style={{ paddingLeft: "85px"}}/>
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
                                        <div className="row pr-2" onClick={()=>navigate('/phone-login')}>
                                            <div className={"col-2 phone btn"} style={{backgroundColor:"#25b9be"}}>
                                                <i className="fa fa-phone fa-fw"/>
                                            </div>
                                            <div className={"col-9 m-0 p-0"}>
                                                <span className="btn text-white" style={{backgroundColor:"#25b9be"}}>
                                                    Sign in with phone
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;