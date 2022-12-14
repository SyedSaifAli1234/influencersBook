import image from "../images/login.jpg";
import logo from "../images/logo.svg";
import {useRef} from "react";
import {register} from "../service/FirebaseService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {facebookProvider, googleProvider, twitterProvider} from "../config/authMethods";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const registerHandler =  (event) => {
        event.preventDefault();
        register(email?.current?.value, password?.current?.value)
            .then(resp => {
                Swal.fire({
                    icon: 'success',
                    title: 'Account Registered Successfully!',
                    text: 'Kindly Login now.',
                });
                navigate('/');
            }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
            });
        });
    }

    return (
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="row no-gutters">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="brand-wrapper">
                                    <img src={logo} alt="logo" className="logo"/>
                                </div>
                                <p className="login-card-description">Create your account</p>
                                <form onSubmit={(event)=>registerHandler(event)}>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="***********" ref={password} required/>
                                     </div>
                                    <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Register"/>
                                </form>
                                <p className="login-card-footer-text">
                                    <a className="text-reset ml-1" style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();navigate('/')}}>Go back to Login?</a>
                                </p>
                                <a className="forgot-password-link" onClick={(e)=>e.preventDefault()}>Sign in with:</a>
                                <div className="container">
                                    <div className="row pr-2" onClick={()=>navigate('/phone-login')}>
                                        <div className={"col-2 phone btn"} style={{backgroundColor:"#25b9be"}}>
                                            <i className="fa fa-phone fa-fw"/>
                                        </div>
                                        <div className={"col-9 m-0 p-0"}>
                                                <span className="btn text-white" style={{backgroundColor:"#25b9be"}}>
                                                    Sign up with phone
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Register;