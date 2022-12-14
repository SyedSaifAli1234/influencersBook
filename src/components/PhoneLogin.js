import React, {useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {addUser, setUpRecaptcha, setUpRecaptchaInvisible} from "../service/FirebaseService";
import Swal from "sweetalert2";

const PhoneLogin = () => {
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const [registerFlow, setRegisterFlow] = useState();
    const navigate = useNavigate();

    useEffect(()=> {
       const isRegisterPhone = sessionStorage.getItem("registerPhone");
       if("Y"===isRegisterPhone) {
           const user = JSON.parse(sessionStorage.getItem("user"));
           setNumber(user.phoneNumber);
           setRegisterFlow(true);
           getOtp();
       }
       return () => {
           sessionStorage.removeItem("registerPhone");
           sessionStorage.removeItem("user");
       }
    },[]);


    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
        useEffect(() => {
            if (didMount.current) {
                func();
            } else {
                didMount.current = true;
            }
        }, deps);
    };

    useDidMountEffect(()=> {
        getOtp();
    },[registerFlow]);

    const getOtp = async (e) => {
        if(e) {
            e.preventDefault();
        }
        setError("");
        if (number === "" || number === undefined)
            return setError("Please enter a valid phone number!");
        try {
            let response;
            if(registerFlow) {
                response = await setUpRecaptcha(number);
            } else {
                response = await setUpRecaptcha(number);
            }
            setResult(response);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };
    const verifyOtp = (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            Swal.fire({
                title: 'Please wait...',
                html: '',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            });
            result.confirm(otp).then(resp => {
                if(registerFlow) {
                    const user = JSON.parse(sessionStorage.getItem("user"));
                    addUser(user.phoneNumber,user,"users").then(response => {
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
                } else {
                    Swal.close();
                    sessionStorage.setItem("userName",resp.user.phoneNumber);
                    navigate("/home");
                }
            }).catch(err=> {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                });
            });
        } catch (err) {
            Swal.close();
            setError(err.message);
        }
    };

    return (
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="row no-gutters">
                        <div className="col-md-2"/>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="p-4 box">
                                    <h2 className="mb-3">{registerFlow ? `Register with phone number` : `Sign in with phone number`}</h2>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <PhoneInput
                                                defaultCountry="US"
                                                value={number}
                                                onChange={setNumber}
                                                placeholder="Enter Phone Number"
                                                required
                                            />
                                            <div id="recaptcha-container"></div>
                                        </Form.Group>
                                        {
                                            !registerFlow ? (
                                                <div className="button-right">
                                                    <Link to="/">
                                                        <Button variant="secondary">Cancel</Button>
                                                    </Link>
                                                    &nbsp;
                                                    <Button type="submit" variant="primary">
                                                        Send Otp
                                                    </Button>
                                                </div>
                                            ) : null
                                        }
                                    </Form>
                                    <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                                        <Form.Group className="mb-3" controlId="formBasicOtp">
                                            <Form.Control
                                                type="otp"
                                                placeholder="Enter OTP"
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </Form.Group>
                                        <div className="button-right">
                                            <Link to="/">
                                                <Button variant="secondary">Cancel</Button>
                                            </Link>
                                            &nbsp;
                                            <Button type="submit" variant="primary">
                                                Verify
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PhoneLogin;