import classes from './failed.module.scss'

const Failed = () => {

	return (
		<div className={classes.box}>
			<div className={classes.text}>
				<div className={classes.title}>Дякуємо за звернення</div>
				<div className={classes.descr}>Ми вам зателефонуємо<br/>для уточнення деталей замовлення</div>
			</div>
		</div>
	);
};

export default Failed;