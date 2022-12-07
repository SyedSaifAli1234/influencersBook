import {useState} from "react";
import {logOut} from "../service/FirebaseService";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [name] = useState(sessionStorage.getItem('userName'));
    const navigate = useNavigate();

    const logoutHandler = () => {
        logOut().then(resp => {
            navigate('/');
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <div className="text-center bg-warning">
                <b> Welcome {name} </b>
            </div>
            <div>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </>
    )
}
export default Home;