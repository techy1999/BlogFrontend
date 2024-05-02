import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = ({ imageUrl }) => {
	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			height='100vh'
			flexDirection={'column'}
		>
			<img src={imageUrl} alt='Centered Image' />

			<Typography variant='p' textAlign='center' mt={4}>
				Page is not available <a href='/'>Go Back</a>
			</Typography>
		</Box>
	);
};

export default NotFound;
