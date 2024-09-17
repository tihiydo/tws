import { LuTrash2 } from "react-icons/lu";
import styles from "../styles.module.scss";


export const DeleteBlock = ({ remove }) => {
	return (
		<div className={styles.block__trash} onClick={remove}>
			<LuTrash2 size={20} />
		</div>
	)
}