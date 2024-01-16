import { Box, Modal } from '@mui/material';
import { MdDownloadDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useState } from 'react';
import { AiFillWarning } from 'react-icons/ai';



const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ED9ED6',
    width: 400,
    height: 150,
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

export const CreateFactModal = ({ handleClose, open, userData, setUserData }) => {
    const [factTitle, setFactTitle] = useState()
    const [fact, setFact] = useState()

    const createFact = async () => {
        const userId = localStorage.getItem("userId")
        console.log(userId)
        await axios
            .post(`https://quiz-backend-service.onrender.com/fact`, { title: factTitle, fact: fact, userId: userId, date: Date.now() })
            .then((response) => {
                setUserData([...userData, { ...response.data }])
                handleClose()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <input id='create-input' className='create-title' value={factTitle} onChange={(e) => setFactTitle(e.target.value)} placeholder='Title' type="text" />
                <input id='create-input' className='create-fact' value={fact} onChange={(e) => setFact(e.target.value)} placeholder='Fact' type="text" />
                <div className='create-btns'>
                    <button className='save-btn' onClick={createFact}><MdDownloadDone size={25} /></button>
                    <button className='close-btn' onClick={handleClose}><IoClose size={25} /></button>
                </div>
            </Box>
        </Modal>
    )
}

