import classes from './subcategoryItemsModal.module.scss';
import TextField from "@mui/material/TextField";
import {Drawer} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
const SubcategoryItemsModal = ({activeItem, setActiveItem, isVisible, setIsVisible, items, setItems}) => {
	const [title, setTitle] = useState('')
	const [title_ru, setTitle_ru] = useState('')

	useEffect(() => {
		if (activeItem) {
			setTitle(activeItem.name)
			setTitle_ru(activeItem.name_ru)
		} else {
			setTitle('')
			setTitle_ru('')
		}
	}, [activeItem])

	const addSubcategory = () => {
		if (activeItem) {
			const newItems = items.map(item => item.id === activeItem.id ? {...item, name: title, name_ru: title_ru} : item)
			setItems(newItems)
			setIsVisible(false)
			setTitle('')
			setTitle_ru('')
			setActiveItem(null)
			return;
		}
		const newItem = {
			id: Date.now(),
			name: title,
			name_ru: title_ru,
		}
		setItems([...items, newItem])
		setIsVisible(false)
		setTitle('')
		setTitle_ru('')
		setActiveItem(null)
	}

	const handleClose = () => {
		setActiveItem(null)
		setIsVisible(false)
	}

	return (
		<Drawer anchor={'right'} open={isVisible} onClose={handleClose}>
			<div className={classes.criterionItemsModal}>
				<div className={classes.title}>{activeItem ? 'Змінити підкатегорію' : 'Додати підкатегорію'}</div>
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

				<Button variant={'contained'} onClick={addSubcategory}>
					{activeItem ? 'Змінити' : 'Додати'}
				</Button>
			</div>
		</Drawer>
	);
};

export default SubcategoryItemsModal;