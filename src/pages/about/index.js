import { FaUserAlt } from "react-icons/fa";
import React from "react";
import { useRouter } from 'next/navigation'
const About = () => {
    const router = useRouter()
    const goToHomePage = () => {
        router.push('/')
    }
    const goToMyFactPage = () => {
        router.push('/my-fact');
    };
    return (
        <div className="about-container">
                <div className='navbar'>
                    <h1  onClick={() => goToHomePage()} style={{ color: 'blueviolet', fontSize: '48px', fontFamily: '  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;' }}>Facts</h1>
                    {/* <button id='navbar-btn' onClick={() => goToHomePage()}>Home</button> */}
                    <button id='navbar-btn' onClick={() => goToMyFactPage()}>My Facts</button>
                    <button style={{ border: 'none', backgroundColor: '#F1EAFF' }}> <FaUserAlt color=' rgb(80, 113, 220)' size={30} /> </button>
                </div>
        </div>
    )
};

export default About;