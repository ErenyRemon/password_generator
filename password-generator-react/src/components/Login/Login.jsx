import './Login.css'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';



function Login() {

    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("User info:", user);
                // ممكن هنا تحفظي بيانات المستخدم في localStorage أو context
                console.log("Navigating to /home...");
                navigate("/home");
            })
            .catch((error) => {
                console.error("Error during login", error);
            });
    };
    return (
        <>
            <div className='mainLogin'>
                <div className='loginRight'>

                    <img className='loginRightUp' src="./01.png" alt="" />
                    <img className='loginRightDown' src="./02.png" alt="" />
                     <img className='loginMobileImage' src="./04.png" alt="" />
                </div>
                <div className='loginLeft'>
                    <img src="./03.png" alt="" />
                    <div className='textOverImage'>
                        <h2>PASSWORD GENERATOR</h2>
                        <button onClick={handleLogin}>Login with Google <FcGoogle /></button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login;