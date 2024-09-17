import classes from "./colorTabSelect.module.scss";
import ImageItem from "@/components/adminpanel/shared/ColorTabSelect/imageItem/imageItem";
import React, {useEffect, useMemo, useState} from "react";
import ColorPickModal from "@/components/adminpanel/shared/ColorTabSelect/ColorPickModal/ColorPickModal";
import {IoMdClose} from "react-icons/io";
import Cropper from "@/components/adminpanel/shared/ProductForm/Cropper/Cropper";
import {useForm, useFormContext} from "react-hook-form";
import ImagesUploadList from "@/components/adminpanel/shared/ColorTabSelect/ImagesUploadList/ImagesUploadList";


const ColorTabSelect = () => {
	const methods = useFormContext()
	const [selectedColor, setSelectedColor] = useState(null);
	const colors = methods.watch('Colors');

	const [isPickColorVisible, setIsPickColorVisible] = useState(false);
	const activeColorStyles = [classes.color, classes.activeColor].join(' ');
	const getColorStyles = (color) => {
		if (selectedColor === color) {
			return activeColorStyles;
		} else {
			return classes.color;
		}
	}

	// console.log(selectedColor)
	//
	// useEffect(() => {
	// 	const newColors = colors.map(col => col.name === selectedColor?.name ? selectedColor : col);
	// 	if (newColors.length) {
	// 		setColors(newColors)
	// 	}
	// }, [images])

	// console.log(images)
	const handleDeleteColor = (color) => {
		const newColors = colors.filter(col => col.name !== color);
		methods.setValue('Colors', newColors)
	}


	// console.log(colors)

	return (
		<div>
			<ColorPickModal colors={colors} setColors={(value) => methods.setValue('Colors', value)} isVisible={isPickColorVisible} handleClose={() => setIsPickColorVisible(false)} />
			<div className={classes.colors}>
				<div onClick={() => setIsPickColorVisible(true)} className={classes.addColor}>
					<div className={classes.plus}>
						+
					</div>
				</div>
				{methods.watch('Colors')?.map(color =>
					<div key={color.name} onClick={() => setSelectedColor(color.name)} className={getColorStyles(color.name)} style={{backgroundColor: color.name}}>
						<div
							onClick={() => handleDeleteColor(color.name)}
							className={classes.close}
						>
							<IoMdClose size={'1em'} />
						</div>
					</div>
				)}
			</div>

			{selectedColor &&
				<ImagesUploadList selectedColor={selectedColor} />
			}
		</div>
	);
};

export default ColorTabSelect;