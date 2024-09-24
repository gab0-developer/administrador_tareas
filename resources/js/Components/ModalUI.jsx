import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const modalStyles = {
    small: { width: '300px' },
    medium: { width: '600px' },
    large: { width: '900px' },
    xlarge: { width: '1200px' },
};
  
const defaultStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
};

function ModalUI({open,close,title,body,size = 'medium'}) {
    const modalStyle = {
        ...defaultStyle,
        ...modalStyles[size],
    };
  
    return (
        <>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box component='div' sx={{backgroundColor:'#ccc',borderTopLeftRadius:10,borderTopRightRadius:10,textAlign:'center',p:'1rem'}}>
                        <Typography variant="h6" component="h2">
                            {title}
                        </Typography>
                    </Box>
                    <Box component='div' sx={{p:'1rem'}}>
                        {body}
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ModalUI
