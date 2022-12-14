import image from "../images/login.jpg";
import logo from "../images/logo.svg";
import {useRef} from "react";
import {addUser, register} from "../service/FirebaseService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {facebookProvider, googleProvider, twitterProvider} from "../config/authMethods";

const Register = () => {

    const password = useRef();
    const navigate = useNavigate();

    const registerHandler =  (event) => {
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
        const user = JSON.parse(sessionStorage.getItem("user"));
        register(user.email, password?.current?.value)
            .then(resp => {
                addUser(resp.user.uid,user,"users").then(response => {
                    Swal.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Account Registered Successfully!',
                        text: 'Kindly Login now.',
                    });
                    navigate('/');
                }).catch(error => {
                    Swal.close();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message,
                    });
                })
            }).catch(err => {
            Swal.close();
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
                        <div className="col-md-2"/>
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
                                    <input name="back" id="back" className="btn btn-block login-btn mb-4" onClick={() => navigate('/register')} value="Back"/>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-2"/>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Register;