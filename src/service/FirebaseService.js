import firebase from "../config/firebase-config";
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    RecaptchaVerifier, signInWithPhoneNumber
} from 'firebase/auth'

const auth = getAuth(firebase);

export const socialMediaAuth = (provider) => {
    return signInWithPopup(auth,provider)
            .then((res)=>{
                return res.user;
            })
            .catch(err => {
                throw err;
            });
}

export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);

export const setUpRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}