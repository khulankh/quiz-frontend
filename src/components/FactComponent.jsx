import axios from 'axios';
import { useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";




export const FactComponent = ({ factData, setData, data }) => {
    const like = factData.likes
    const disLike = factData.dislikes

    const [liked, setLiked] = useState(like);
    const [disliked, setDisliked] = useState(disLike);

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
            .catch((err) => {
                console.log(err)
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

    const date = new Date(factData.date);

    const formattedDate = date.toLocaleString();
    console.log(formattedDate)

    return (
        <div className="component-container">
            <div style={{ display: 'flex', gap: '30px',}}>
                <FaRegUser size={40} />
                <div style={{ display: 'flex', gap: '20px' , flexDirection: 'column',  }}>
                    <div style={{ display: 'flex' , gap:'10px' }}>
                        <h1 className="title">
                            {factData.title}
                        </h1>
                        <p style={{color:'#392467', paddingTop: '10px'}}>{formattedDate}</p>
                        <p style={{color:'#392467', paddingTop: '10px'}}>{factData.userId}</p>
                    </div>
                    <p className='fact'>
                        {factData.fact}
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex' ,flexDirection: 'column' ,padding: '20px 20px'}}>
                <button className='like-btn' onClick={handleLikeClick}><AiOutlineLike size={20} />{liked.length}</button>
                <button className='like-btn' onClick={handleDislikeClick}><AiOutlineDislike size={20} />{disliked.length}</button>
            </div>
        </div>

    )
}