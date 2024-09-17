import Modal from "@/components/shared/UI/Modal/Modal";
import classes from './criterionsModal.module.scss';
import TextField from "@mui/material/TextField";
import {IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {IoMdClose} from "react-icons/io";
import CriterionItemsModal
	from "@/components/adminpanel/shared/ProductForm/CreateCriterions/CriterionsModal/CriterionItemsModal/CriterionItemsModal";
import {MdEdit} from "react-icons/md";
import {FaTrash} from "react-icons/fa";
import {useFormContext} from "react-hook-form";

const CriterionsModal = ({activeCriterion, setActiveCriterion, isVisible, setIsVisible}) => {
	const methods = useFormContext();
	const [title, setTitle] = useState('');
	const [title_ru, setTitle_ru] = useState('');
	const [description, setDescription] = useState('');
	const [description_ru, setDescription_ru] = useState('');
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [items, setItems] = useState([]);
	const [activeItem, setActiveItem] = useState(null);

	useEffect(() => {
		if (activeCriterion) {
			setTitle(activeCriterion.name)
			setTitle_ru(activeCriterion.name_ru)
			setDescription(activeCriterion.description)
			setDescription_ru(activeCriterion.description_ru)
			setItems(activeCriterion.CriterionItems)
		} else {
			setTitle('')
			setTitle_ru('')
			setDescription('')
			setDescription_ru('')
			setItems([])
		}
	}, [activeCriterion])

	function editItem(item) {
		// const newCriterions =
		setActiveItem(item)
		setIsDrawerVisible(true)
	}
	const handleClose = () => {
		setActiveCriterion(null)
		setIsVisible(false)
	}

	function deleteItem(item) {
		const newCriterions = items?.filter(cr => cr.id !== item.id)
		setItems(newCriterions)
	}

	const addCriterion = () => {
		if (activeCriterion) {
			const newCriterion = {
				name: title,
				name_ru: title_ru,
				description: description,
				description_ru: description_ru,
				CriterionItems: items
			}
			const newCriterions = (methods.getValues('Criterions')?.map(cr => {
				if (cr.name === activeCriterion.name) {
					return newCriterion;
				} else {
					return cr;
				}
			}))
			methods.setValue('Criterions', newCriterions)
			setDescription('')
			setDescription_ru('')
			setTitle('')
			setTitle_ru('')
			setItems([])
			handleClose();
			return;
		}
		const newCriterion = {
			name: title,
			name_ru: title_ru,
			description: description,
			description_ru: description_ru,
			CriterionItems: items
		}
		const newCriterions = ([...methods.getValues('Criterions'), newCriterion])
		methods.setValue('Criterions', newCriterions)
		handleClose();
		setDescription('')
		setDescription_ru('')
		setTitle('')
		setTitle_ru('')
		setItems([])
	}
	return (
		<Modal isVisible={isVisible} handleClose={handleClose}>
			<div className={classes.criterionsModal}>
				<div className={classes.title}>{activeCriterion ? 'Змінити критерію' : 'Додати критерію'}</div>
				<CriterionItemsModal
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					isVisible={isDrawerVisible}
					setIsVisible={setIsDrawerVisible}
					items={items}
					setItems={setItems}
				/>
				<div className={classes.close} onClick={handleClose}><IoMdClose size={'1.5em'}/></div>
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
				<div className={classes.itemsHeader}>
					<div className={classes.title}>Критерії</div>
					<Button variant={'contained'} onClick={() => setIsDrawerVisible(true)}>
						Додати
					</Button>
				</div>
				<div className={classes.itemList}>
					{items?.map(item =>
						<div className={classes.item} key={item.id}>
							<div className={classes.title}>
								<div className={classes.name}>{item.name}</div>
								<div className={classes.price}>{item.price} ₴</div>
							</div>
							<div className={classes.controls}>
								<IconButton onClick={() => editItem(item)}><MdEdit size={'0.8em'}/></IconButton>
								<IconButton onClick={() => deleteItem(item)}><FaTrash size={'0.8em'}/></IconButton>
							</div>
						</div>
					)}
				</div>
				<Button variant={'contained'} onClick={addCriterion}>
					{activeCriterion ? 'Змінити' : 'Зберегти'}
				</Button>
			</div>
		</Modal>
	);
};

export default CriterionsModal;