import { useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'

const SignUp = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [age, setAge] = useState('')
    const [picture, setPicture] = useState('')
    const [location, setLocation] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [ageError, setAgeError] = useState('')
    const [required, setRequired] = useState('')


    const handleChangeUserName = (event) => {
        const userName = event.target.value

        if (userName.length <= 4) {
            setUsernameError("Username must be more than 4 characters");
        } else {
            setUsernameError('')
        }
        setUsername(userName)
    };
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
    const handleChangeConfirmPassword = (event) => {
        const confirmPassword = event.target.value
        if (confirmPassword === '') {
            setConfirmPasswordError('Please confirm password')
        } else if (confirmPassword === password) {
            setConfirmPasswordError('')
        }
        setConfirmPassword(confirmPassword)
    }
    const handleChangeAge = (event) => {
        const age = event.target.value
        if (age <= 18) {
            setAgeError("You must be older than 18");
        } else {
            setAgeError('')
        }
        setAge(age)
    }
    const handleSignUp = async () => {
        if (
            username === '' ||
            email === ' ' ||
            password === '' ||
            confirmPassword === '' ||
            age === ''
        ) {
            setRequired('Please enter all inputs')
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Confirm Password must match with Password')
        } else {
            await axios
                .post("https://quiz-backend-service.onrender.com/signup", {
                    username: username,
                    password: password,
                    age: age,
                    email: email,
                    picture: picture,
                })
                .then((response) => {
                    router.push("../login")
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        
    };


    return (
        <div className="signup-container">
            <div className="signup-desc">
                <h1 style={{fontSize: "56px"}}>Sign Up</h1>
                <p>Already signed up? <a style={{color: "azure"}} href="../login">Log In</a></p>
            </div>
            <div className="signup-face">
                <div id="signup-inputs">
                    <div className="dedDiv">
                        <input className="signup-input" type="text" placeholder="Username" value={username} onChange={handleChangeUserName} />
                        <div style={{ color: "red" }}>{usernameError}</div>
                        <input className="signup-input" type="email" placeholder="Email" value={email} onChange={handleChangeEmail} />
                        <div style={{ color: "red" }}>{emailError}</div>
                    </div>
                    <div className="dedDiv">
                        <input className="signup-input" type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
                        <div style={{ color: "red" }}>{passwordError}</div>
                        <input className="signup-input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleChangeConfirmPassword} />
                        <div style={{ color: "red" }}>{confirmPasswordError}</div>
                    </div>
                    <div className="dedDiv">
                        <input className="signup-input" type="number" placeholder="Age" value={age} onChange={handleChangeAge} />
                        <div style={{ color: "red" }}>{ageError}</div>
                        <input className="signup-input" type="url" placeholder="Picture" value={picture} onChange={(e) => setPicture(e.target.value)} />
                        {/* <input className="signup-input" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /> */}
                    </div>
                </div>
                {/* <button className="accept-button" onClick={() => createUser(username, email, password, confirmpassword, age, picture, location)}>Sign Up</button> */}
                <button className="accept-button" onClick={handleSignUp}>Sign Up</button>
                <div style={{ color: "red" }}>{required}</div>
            </div>
        </div>
    )

}
export default SignUp