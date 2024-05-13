import { Box,useMediaQuery } from '@mui/material'
import React from 'react'

const JoinTeam = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <Box
          maxWidth={"auto"}
          minHeight={500}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow="5px 5px 10px #1976D2"
          padding={5}
          borderRadius={10}
          m={`${isMobile? "5%" : "50px auto"}`}
        >
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdEw_AwvHWtkUdiW2Ilj6QSx0DnUoJ4NS_RkNzsfNVRZI26Sg/viewform?embedded=true" width="640" height="1031" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </Box>
    )
}

export default JoinTeam
