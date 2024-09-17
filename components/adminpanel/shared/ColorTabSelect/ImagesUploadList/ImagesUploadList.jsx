import React, {useMemo} from 'react';
import Cropper from "@/components/adminpanel/shared/ProductForm/Cropper/Cropper";
import {useFormContext} from "react-hook-form";
import classes from "@/components/adminpanel/shared/ColorTabSelect/colorTabSelect.module.scss";
import {v4 as uuidv4} from "uuid";

const ImagesUploadList = ({selectedColor}) => {
	const methods = useFormContext()
	const colors = methods.watch('Colors');
	const selectedColorItem = colors.find(col => col.name === selectedColor);
	const updateImage = (index, value) => {
		const images = selectedColorItem?.ProductImages;
		const newItems = [...images];
		console.log(index)
		newItems[index] = {name: '', url: value};
		const newColors = colors.map(col => {
			if (col.name === selectedColorItem.name) {
				return ({...col, ProductImages: newItems})
			} else {
				return col;
			}
		})
		methods.setValue('Colors', newColors);
	};
	const addImage = () => {
		const newColors = colors.map(col => {
			if (col.name === selectedColor) {
				return ({...col, ProductImages: [...col.ProductImages, {name: '', url: ''}]})
			} else {
				return col;
			}
		})
		methods.setValue('Colors', newColors)
	};


	const images = colors?.find(col => col.name === selectedColor)?.ProductImages;


	return (
		<div className={classes.photos}>
			<div className={classes.addPhoto} onClick={addImage}>
				<div className={classes.plus}>
					+
				</div>
			</div>
			{images?.map((img, index) =>
				<Cropper
					placeholder={'/assets/icons/image_uploader_plus.svg'}
					key={uuidv4()}
					height={100}
					width={100}
					file={img}
					setFile={(value) => updateImage(index, value)}
				/>
			)}
		</div>
	);
};

export default ImagesUploadList;