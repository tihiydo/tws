import React from 'react';
import classes from "./colorPickModal.module.scss";
import Modal from "@/components/shared/UI/Modal/Modal";

const colorsData = {
	puffs: {
		name: 'Пуфи/банкетки',
		colors: [
			'#A4A89E',
			'#545F5E',
			'#066A74',
			'#206D51',
			'#CDB5A3',
			'#5D453F',
			'#000',
		]
	},
	chairs: {
		name: 'Стільці',
		colors: [
			'#A4A89E',
			'#5A5A5A',
			'#96BEB8',
			'#066A74',
			'#CDB5A3',
			'#657B59',
			'#C8A61F',
			'#206D51',
			'#f38210',
		]
	},
	legs: {
		name: 'Ніжки',
		colors: [
			'#A4A89E',
			'#5A5A5A',
			'#96BEB8',
			'#066A74',
			'#CDB5A3',
			'#657B59',
			'#C8A61F',
			'#206D51',
		]
	}
}
const ColorPickModal = ({colors, setColors, isVisible, handleClose}) => {

	const handleClick = (color) => {
		const newColor = {
			name: color,
			ProductImages: []
		}
		if (!colors.find(col => col.name === color)) {
			setColors([...colors, newColor])
		}
		handleClose()
	}

	return (
		<Modal isVisible={isVisible} handleClose={handleClose}>
			<div className={classes.pickColor}>
				{Object.entries(colorsData).map(([key, value]) => {
					return (
						<>
							<div className={classes.title}>{value.name}</div>
							<div className={classes.colorItems}>
								{value.colors.map((item, index) =>
									<div key={item} onClick={() => handleClick(item)} className={classes.color} style={{background: item}}>
									</div>
								)}
							</div>

						</>
					)
				})}
			</div>
		</Modal>
	);
};

export default ColorPickModal;

	// <h3>Ніжки</h3>
	// <h5>Метал</h5>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #DF9500;"
	// 	 colorid=""></div>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #000;"
	// 	 colorid=""></div>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #FFF;"
	// 	 colorid=""></div>
	// <h3>Столи</h3>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #BDA188;"
	// 	 colorid=""></div>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #332114;"
	// 	 colorid=""></div>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #5a5a5a;"
	// 	 colorid=""></div>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #dcdcd6;"
	// 	 colorid=""></div>
	// <div className={classes.color} id="thisAddNewColor" style="background-color: #fff;"
	// 	 colorid=""></div>