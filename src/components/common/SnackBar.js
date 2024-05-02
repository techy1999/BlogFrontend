/* =======================================================  
    NOTE :- PLEASE USE THIS COMPONENT FOR 
            RESPONSE NOTIFICATION IN UI
======================================================== */

import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

export default function SimpleSnackbar({ message, open, setOpen, severity }) {
	const handleClose = (event, reason) => {
		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}
			>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				action={action}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert
					onClose={handleClose}
					severity={severity}
					variant='filled'
					sx={{ width: '100%' }}
				>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
}
