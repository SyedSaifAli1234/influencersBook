import logo from "../images/logo.svg";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const userName = useRef();
    const email = useRef();
    const navigate = useNavigate();

    const gotoNextStep = () => {
        const user = {email: email?.current?.value, userName: userName?.current?.value};
        sessionStorage.setItem("user",JSON.stringify(user));
        navigate('/register2');
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
                                <form>
                                    <div className="form-group input-container">
                                        <label htmlFor="userName" className="sr-only">userName</label>
                                        <p className="text-dark"> <b> link.tree/ </b></p>
                                        <input type="text" name="userName" id="userName" className="form-control" placeholder="Username" ref={userName} required style={{ paddingLeft: "85px"}}/>
                                    </div>
                                    <div className="form-group input-container">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Email address" ref={email} required/>
                                    </div>
                                    <input name="continue" id="continue" className="btn btn-block login-btn mb-4" onClick={gotoNextStep} value="Continue"/>
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
                        <div className="col-md-2"/>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Register;