import styles from "./allRecords.module.scss";
import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import Button from "@mui/material/Button";
import { LuPlus } from "react-icons/lu";
import SeoRecordCard from "./recordCard";

const AllRecords = ({ records }) => {
	return (
		<div className={styles.seo}>
			<div className={styles.seo__header}>
				<TitlePage title="Всі записи"/>
				<Button
					href={"/adminpanel/seo/new"}
					startIcon={<LuPlus />}
					variant="contained"
					size={"large"}
				>
					Створити
				</Button>
			</div>

			<div className={styles.seo__records}>
				{
					records.map(item => (
						<SeoRecordCard key={item.id} record={item} />
					))
				}
			</div>
		</div>
	);
}

export default AllRecords;