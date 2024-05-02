import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

export default function ConfirmationModel({
	message,
	btn1,
	btn2,
	openModel,
	setOpenModel,
}) {
	const [open, setOpen] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant='outlined' onClick={handleClickOpen}>
				Open alert dialog
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<Box p={4}>
					<CloseIcon
						sx={{
							float: 'right',
							marginBottom: '10px',
							fontSize: '20px',
							cursor: 'pointer',
						}}
						onClick={handleClose}
					/>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							{message}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>{btn1}</Button>
						<Button onClick={handleClose} autoFocus>
							{btn2}
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</>
	);
}
