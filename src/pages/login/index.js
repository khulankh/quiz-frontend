import { useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
const LogIn = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [required, setRequired] = useState('')

    const handleChangeEmail = (event) => {
        const email = event.target.value
        if (email.includes('@')) {
            setEmailError("");
        } else {
            setEmailError('Please enter valid email address')
        }
        setEmail(email)
    };
    const handleChangePassword = (event) => {
        const password = event.target.value
        if (password.length <= 8) {
            setPasswordError("Password must be more than 8 characters");
        } else {
            setPasswordError('')
        }
        setPassword(password)

    }
    const handleLogIn = async () => {
        if (
            email === ' ' ||
            password === ''
        ) {
            setRequired('Please enter all inputs')
        } else {
            console.log(password, email)
            await axios.post("https://quiz-backend-service.onrender.com/login", {
                email: email,
                password: password,
            })
                .then((response) => {
                    console.log(response)
                    localStorage.setItem('user', true)
                    localStorage.setItem('userId', response.data.userId)
                    router.push("/")
                })
                .catch((error) => {
                    setRequired('Password is incorrect')
                })
        }


    };



    return (
        <div className="login-container">
            <div className="login-desc">
                <h1 style={{ fontSize: "56px", fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}>Welcome Back !</h1>
                <p>Doesn't have an account yet? <a style={{ color: "rgb(249, 252, 255)" }} href="../signup">Sign Up</a></p>
            </div>
            <div className="login-face">
                <div id="login-inputs">

                    <input className="login-input" type="email" placeholder="Email" value={email} onChange={handleChangeEmail} />
                    <div style={{ color: "red" }}>{emailError}</div>
                    <input className="login-input" type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
                    <div style={{ color: "red" }}>{passwordError}</div>

                </div>
                <button className="login-btn" onClick={handleLogIn}>Log In</button>
                <div style={{ color: "red" }}>{required}</div>


            </div>
        </div>
    )

}
export default LogIn
