import React from 'react'
import { CircularProgress, Box, Backdrop } from '@mui/material';
const LoaderScreen = ({open, handleClose}) => {
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default LoaderScreen
