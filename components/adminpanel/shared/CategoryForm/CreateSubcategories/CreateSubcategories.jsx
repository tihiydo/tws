import classes from './createSubcategories.module.scss';
import Button from "@mui/material/Button";
import {useState} from "react";
import {useFormContext} from "react-hook-form";
import {IconButton} from "@mui/material";
import {MdEdit} from "react-icons/md";
import {FaTrash} from "react-icons/fa";
import SubcategoryItemsModal
	from "@/components/adminpanel/shared/CategoryForm/CreateSubcategories/SubcategoryItemsModal/SubcategoryItemsModal";
const CreateSubcategories = () => {
	const methods = useFormContext();
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [activeSubcategory, setActiveSubcategory] = useState(null)
	const subcategories = methods.watch('Subcategories');

	function editItem(item) {
		setActiveSubcategory(item)
		setIsModalVisible(true)
	}

	function deleteItem(item) {
		const newSubcategories = (methods.getValues('Subcategories')?.filter(cat => cat.name !== item.name))
		methods.setValue('Subcategories', newSubcategories)
	}

	const addCriterion = () => {

		// setIsVisible(false)
		// setDescription('')
		// setTitle('')
		// setItems(null)
	}

	return (
		<div className={classes.createCriterions}>
			<SubcategoryItemsModal
				activeItem={activeSubcategory}
				setActiveItem={setActiveSubcategory}
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
				items={subcategories}
				setItems={(value) => methods.setValue('Subcategories', value)}
			/>
			<div className={classes.header}>
				<div className={classes.title}>Підкатегорії</div>
				<Button variant={'contained'} onClick={() => setIsModalVisible(true)}>
					Додати
				</Button>
			</div>
			<div className={classes.itemList}>
				{subcategories?.map(item =>
					<div className={classes.item} key={item.id}>
						<div className={classes.title}>
							<div className={classes.name}>{item.name}</div>
						</div>
						<div className={classes.controls}>
							<IconButton onClick={() => editItem(item)}><MdEdit size={'0.8em'}/></IconButton>
							<IconButton onClick={() => deleteItem(item)}><FaTrash size={'0.8em'}/></IconButton>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateSubcategories;