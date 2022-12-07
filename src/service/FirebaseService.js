import firebase from "../config/firebase-config";
import { getAuth , signInWithPopup } from  'firebase/auth'

export const socialMediaAuth = (provider) => {
    return signInWithPopup(getAuth(firebase),provider)
            .then((res)=>{
                return res.user;
            })
            .catch(err => {
                return err;
            });
}

export const createAccount = (email, password) => getAuth(firebase).createUserWithEmailAndPassword(email, password);

export const signIn = (email, password) => getAuth(firebase).signInWithEmailAndPassword(email, password);

export const signOut = (email, password) => getAuth(firebase).signOut();
