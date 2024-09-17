import Input from "@/components/adminpanel/shared/UI/Input/Input";
import { DeleteBlock } from "@/components/adminpanel/pages/Blog/contentBlock/blocks/DeleteBlock";
import styles from "./../styles.module.scss";

export const TitleBlock = ({
	name,
	number,
	remove,
	...props
}) => {
	return (
		<div className={styles.block}>
			<div className={styles.block__col}>
				<div className={styles.block__title}>
					<div>
						Блок { number }: ЗАГОЛОВОК
					</div>
					<DeleteBlock remove={remove} />
				</div>
				<div className={styles.block__row}>
					<Input
						name={`${name}.title`}
						label="Заголовок"
						multiline
						style={{width: '100%'}}
					/>
					<Input
						name={`${name}.title_ru`}
						label="Заголовок RU"
						multiline
						style={{width: '100%'}}
					/>
				</div>
			</div>
		</div>
	);
};