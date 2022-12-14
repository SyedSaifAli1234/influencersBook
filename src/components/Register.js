import logo from "../images/logo.svg";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import PhoneInput from "react-phone-number-input";

const Register = () => {

    const userName = useRef();
    const email = useRef();
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    const [typeCheck, setTypeCheck] = useState(true);

    const gotoNextStep = (event) => {
        event.preventDefault();
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
                                <form onSubmit={(event)=>gotoNextStep(event)}>
                                    <div className="form-group input-container">
                                        <label htmlFor="userName" className="sr-only">userName</label>
                                        <p className="text-dark"> <b> link.tree/ </b></p>
                                        <input type="text" name="userName" id="userName" className="form-control" placeholder="Username" ref={userName} required style={{ paddingLeft: "85px"}}/>
                                    </div>
                                    {
                                        typeCheck?(
                                            <>
                                                <div className="form-group input-container">
                                                    <input type="email" name="email" id="email" className="form-control" placeholder="Email address" ref={email} required/>
                                                </div>
                                                <a className="ml-1" style={{cursor:"pointer"}} onClick={()=>{setTypeCheck(!typeCheck)}}><u>Use phone number instead</u></a>
                                            </>
                                            ):(
                                                <>
                                                    <div className="form-group border bg-light p-1">
                                                        <PhoneInput
                                                            defaultCountry="US"
                                                            value={phoneNumber}
                                                            onChange={setPhoneNumber}
                                                            placeholder="Enter Phone Number"
                                                        />
                                                    </div>
                                                    <a className="ml-1" style={{cursor:"pointer"}} onClick={()=>{setTypeCheck(!typeCheck)}}><u>Use Email instead</u></a>
                                                </>
                                            )
                                    }
                                    <input name="continue" id="continue" className="btn btn-block login-btn mb-4 mt-5" type="submit" value="Continue"/>
                                </form>
                                <p className="login-card-footer-text">
                                    <a className="text-reset ml-1" style={{cursor:"pointer"}} onClick={(e)=>{e.preventDefault();navigate('/')}}><u>Go back to Login?</u></a>
                                </p>
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