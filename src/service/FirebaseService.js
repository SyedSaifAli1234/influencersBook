import firebase from "../config/firebase-config";
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    RecaptchaVerifier, signInWithPhoneNumber
} from 'firebase/auth';
import {
    getFirestore,
    setDoc,
    getDoc,
    getDocs,
    doc,
    collection, query, where
} from 'firebase/firestore/lite';

const auth = getAuth(firebase);
const db = getFirestore();

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
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}

export const addUser = async (id, user, collectionName) => await setDoc(doc(db, collectionName, id), {...user});

export const getUser = async (id,collectionName) => await getDoc(doc(db, collectionName, id)).getData();

export const getUserByUserName = async (userName,collectionName) => await getDocs(query(collection(db, collectionName), where("userName", "==", userName)));
