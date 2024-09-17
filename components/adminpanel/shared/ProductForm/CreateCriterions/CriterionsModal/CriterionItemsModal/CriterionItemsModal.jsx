import classes from './criterionItemsModal.module.scss';
import TextField from "@mui/material/TextField";
import {Drawer, InputAdornment} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
const CriterionItemsModal = ({activeItem, setActiveItem, isVisible, setIsVisible, items, setItems}) => {
	const [title, setTitle] = useState('')
	const [title_ru, setTitle_ru] = useState('')
	const [description, setDescription] = useState('')
	const [description_ru, setDescription_ru] = useState('')
	const [price, setPrice] = useState( '')

	useEffect(() => {
		if (activeItem) {
			setTitle(activeItem.name)
			setTitle_ru(activeItem.name_ru)
			setDescription(activeItem.description)
			setDescription_ru(activeItem.description_ru)
			setPrice(activeItem.price)
		} else {
			setTitle('')
			setTitle_ru('')
			setDescription('')
			setDescription_ru('')
			setPrice('')
		}
	}, [activeItem])

	const addCriterion = () => {
		if (activeItem) {
			const newItems = items.map(item => item.id === activeItem.id ? {...item, name: title, name_ru: title_ru, description, description_ru, price} : item)
			setItems(newItems)
			setIsVisible(false)
			setTitle('')
			setTitle_ru('')
			setDescription('')
			setDescription_ru('')
			setPrice('')
			setActiveItem(null)
			return;
		}
		const newItem = {
			id: Date.now(),
			name: title,
			name_ru: title_ru,
			price: price,
			description: description,
			description_ru: description_ru
		}
		setItems([...items, newItem])
		setIsVisible(false)
		setTitle('')
		setTitle_ru('')
		setDescription('')
		setDescription_ru('')
		setPrice('')
		setActiveItem(null)
	}

	const handleClose = () => {
		setActiveItem(null)
		setIsVisible(false)
	}

	return (
		<Drawer anchor={'right'} open={isVisible} onClose={handleClose}>
			<div className={classes.criterionItemsModal}>
				<div className={classes.title}>{activeItem ? 'Змінити критерію' : 'Додати критерію'}</div>
				<TextField
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					size={'small'}
					label={'Назва'}
					variant="outlined"
				/>
				<TextField
					value={title_ru}
					onChange={(e) => setTitle_ru(e.target.value)}
					size={'small'}
					label={'Назва RU'}
					variant="outlined"
				/>

				<TextField
					InputProps={{
						startAdornment: <InputAdornment position="start">₴</InputAdornment>,
					}}
					type='number'
					size={"small"}
					label="Ціна"
					variant="outlined"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>

				<TextField
					inputProps={{
						style: {height: 100, width: 300}
					}}
					label={'Опис'}
					multiline
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<TextField
					inputProps={{
						style: {height: 100, width: 300}
					}}
					label={'Опис RU'}
					multiline
					value={description_ru}
					onChange={(e) => setDescription_ru(e.target.value)}
				/>
				<Button variant={'contained'} onClick={addCriterion}>
					{activeItem ? 'Змінити' : 'Додати'}
				</Button>
			</div>
		</Drawer>
	);
};

export default CriterionItemsModal;