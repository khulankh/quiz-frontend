import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UpdateFactModal } from './UpdateFactModal';
import { FaRegUser } from 'react-icons/fa';


export const MyFactComponent = ({ factData, setData, data }) => {
    console.log(factData.date)
    const like = factData.likes
    const disLike = factData.dislikes
    const [liked, setLiked] = useState(like);
    const [disliked, setDisliked] = useState(disLike);
    const [showUpdateFactModal, setShowUpdateFactModal] = React.useState(false);
    const handleOpen = () => setShowUpdateFactModal(true);
    const handleClose = () => setShowUpdateFactModal(false);
    const userId = localStorage.getItem("userId");

    const handleLikeClick = async () => {
        const res = await axios
            .put(`https://quiz-backend-service.onrender.com/fact/like/${factData._id}/${userId}`)
            .then((response) => {
                console.log(factData._id)
                setLiked(response.data.likes)
                setDisliked(response.data.dislikes)
                const likedData = data.filter((data) => data._id !== response.data._id)
                setData([...likedData, { ...response.data }])
            })
            .catch((error) => {
                console.log(error)
            })
        console.log('clicked like by ' + userId);
        console.log(res)
        if (!liked) {
            setLiked(true);
            setDisliked(false);
        }
    };

    const handleDislikeClick = async () => {
        console.log(factData._id)
        const res = await axios
            .put(`https://quiz-backend-service.onrender.com/fact/dislike/${factData._id}/${userId}`)
            .then((response) => {
                console.log(response)
                setDisliked(response.data.dislikes)
                setLiked(response.data.likes)
                const dislikedData = data.filter((data) => data._id !== response.data._id)
                setData([...dislikedData, { ...response.data }])
            })
            .catch((err) => {
                console.log(err)
            })
        console.log('clicked like by ' + userId);
        console.log(res)
        if (!disliked) {
            setDisliked(true);
            setLiked(false);
        }
    };

    const handleDeleteClick = async () => {
        console.log(factData._id)
        const res = await axios
            .delete(`https://quiz-backend-service.onrender.com/fact/${factData._id}`)
            .then((response) => {
                console.log(response)
                setData((prevData) => prevData.filter((fact) => fact._id !== factData._id));
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const date = new Date(factData.date);

    const formattedDate = date.toLocaleString();
    console.log(formattedDate)

    if (!factData) {
        return <h1>There is no fact.</h1>;
    }
    return (
        <div className="component-container">
            <div style={{ display: 'flex', gap: '30px' }}>
                <FaRegUser size={40} />
                <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <h1 className="title">
                            {factData.title}
                        </h1>
                        <p style={{ color: '#392467', paddingTop: '10px' }}>{formattedDate}</p>
                        <p style={{ color: '#392467', paddingTop: '10px' }}>{factData.userId}</p>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button onClick={handleOpen} className='edit-btn'> <CiEdit size={20} /> </button>
                            <button onClick={handleDeleteClick} className='delete-btn'> <RiDeleteBin6Line size={20} /> </button>
                        </div>
                    </div>
                    <p className='fact'>
                        {factData.fact}
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button className='like-btn' onClick={handleLikeClick}><AiOutlineLike size={20} /> {Array.isArray(liked) ? liked.length : liked}</button>
                <button className='like-btn' onClick={handleDislikeClick}><AiOutlineDislike size={20} />  {Array.isArray(disliked) ? disliked.length : disliked}</button>
            </div>
            <UpdateFactModal setData={setData} handleClose={handleClose} open={showUpdateFactModal} factData={factData} data={data} />
        </div>

    )
}