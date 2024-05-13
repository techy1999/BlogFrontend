import React from 'react'
import {Box, Button, Typography} from '@mui/material'
const TermsCondition = () => {
  return (
    <Box style={{
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center" ,
        alignItems: "center",
        margin:"20px auto"
    }}>
        <Typography variant='h4' >We are working on the page Terms Condition page</Typography>
        <Typography variant='p' >This page will come soon... </Typography>
        <Typography variant='p' >Thank you visiting.Go back to home page to explore more <Button variant='contained' href='/' color='primary'>Go to home</Button> </Typography>
    </Box>
  )
}

export default TermsCondition
