
import { useRouter } from 'next/navigation'
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import React from 'react';
import { MyFactComponent } from '@/components/MyFactComponent';
import axios from 'axios';
import { CreateFactModal } from '@/components/CreateFactModal';

const MyFact = () => {
    const router = useRouter()
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(true)
    // const [allFacts, setAllFacts] = useState("")
    const [showCreateFactModal, setShowCreateFactModal] = React.useState(false);
    const handleOpen = () => setShowCreateFactModal(true);
    const handleClose = () => setShowCreateFactModal(false);


    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://quiz-backend-service.onrender.com/fact/${userId}`);
                setUserData(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const goToHomePage = () => {
        router.push('/');
    };


    return (
        <>
            < div className='myfact-container' >
                <div className='navbar'>
                    <h1 onClick={() => goToHomePage()} style={{ color: '#EA168E', fontSize: '48px' , fontFamily: '  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;' }}>Facts</h1>
                    {/* <button id='my-home' onClick={goToHomePage}>Home</button> */}
                    <button id='navbar-btn' onClick={handleOpen} >Create Fact</button>
                    <button id='selected' >My Facts</button>
                </div >
                <div className='facts'>
                    {
                        loading === false ? userData.map((factData) => {
                            return <MyFactComponent key={factData.userId} factData={factData} data={userData} setData={setUserData} />
                        }) : 'loading'
                    }
                </div>
                <CreateFactModal handleClose={handleClose} open={showCreateFactModal} setUserData={setUserData} userData={userData} />
            </div >
        </>
    )
}
export default MyFact




