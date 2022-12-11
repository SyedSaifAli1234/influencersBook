import image from "../images/login.jpg";
import logo from "../images/logo.svg";
import {useRef} from "react";
import {register} from "../service/FirebaseService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
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
                        <div className="col-md-5">
                            <img src={image} alt="login" className="login-card-img"/>
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <div className="brand-wrapper">
                                    <img src={logo} alt="logo" className="logo"/>
                                </div>
                                <p className="login-card-description">Register</p>
                                <form onSubmit={(event)=>registerHandler(event)}>
                                    <div className="form-group">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Email address" ref={email} required/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="***********" ref={password} required/>
                                    </div>
                                    <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Register"/>
                                </form>
                                <p className="login-card-footer-text">
                                    <a className="text-reset ml-1" style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();navigate('/')}}>Go back to Login?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Register;