import { Box, Modal } from '@mui/material';
import { MdDownloadDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useState } from 'react';



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

export const UpdateFactModal = ({ handleClose, open, factData, setData, data }) => {
    const [factTitle, setFactTitle] = useState(factData.title)
    const [fact, setFact] = useState(factData.fact)

    const updateFact = async () => {
        await axios
            .put(`https://quiz-backend-service.onrender.com/fact/${factData._id}`, { title: factTitle, fact: fact })
            .then((response) => {
                console.log(response)
                // setFactTitle(response.data.title)
                // setFact(response.data.fact)
                const updatedFacts = data.map((fact) => {

                    if (fact._id === response.data._id) {
                        return { ...response.data }
                    } else {
                        return fact
                    }
                })
                setData(updatedFacts)

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
                <input className='edit-input' value={factTitle} onChange={(e) => setFactTitle(e.target.value)} type="text" />
                <input className='edit-input' value={fact} onChange={(e) => setFact(e.target.value)} type="text" />
                <div className='update-btns'>
                    <button className='save-btn' onClick={updateFact}><MdDownloadDone size={25} /></button>
                    <button className='close-btn' onClick={handleClose}><IoClose size={25} /></button>
                </div>
            </Box>
        </Modal>
    )
}