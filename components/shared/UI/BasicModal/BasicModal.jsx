"use client"
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import classes from "@/pagessss/HowToOrderPage/HowToOrder.module.scss";
import {FormControl, TextField} from "@mui/material";


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
};

const BasicModal = () => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [nameError, setNameError] = React.useState(false);
	const [phoneError, setPhoneError] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
		setName('');
		setPhone('');
		setNameError(false);
		setPhoneError(false);
	};
	const handleClose = () => setOpen(false);

	const handleNameChange = (event) => {
		setName(event.target.value);
		setNameError(false);
	};

	const handlePhoneChange = (event) => {
		setPhone(event.target.value);
		setPhoneError(false);
	};

	const handleSubmit = () => {
		if (!name) {
			setNameError(true);
		}
		if (!phone) {
			setPhoneError(true);
		}
		if (name && phone) {
			// submit form
		}
	};

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>Залишити заявку</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className={classes.modalTitle}>Залишити заявку</div>
					<div className={classes.modalBody}>
						<FormControl variant="standard">
							<TextField
								fullWidth
								size="small"
								label="Ім'я"
								value={name}
								onChange={handleNameChange}
								error={nameError}
								required
							/>
							{nameError && <span className={classes.errorText}>Полe обов'язкове для заповнення</span>}
						</FormControl>
						<FormControl variant="standard">
							<TextField
								fullWidth
								size="small"
								label="Номер телефону"
								placeholder="+380"
								value={phone}
								onChange={handlePhoneChange}
								error={phoneError}
								required
							/>
							{phoneError && <span className={classes.errorText}>Поле обов'язкове для заповнення</span>}
						</FormControl>
					</div>

					<div className={classes.modalBtn}>
						<Button variant="contained" onClick={handleSubmit} type="submit">Залишити заявку</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}

export default BasicModal;