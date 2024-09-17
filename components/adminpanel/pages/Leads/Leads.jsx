import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import MainLeads from "@/components/adminpanel/pages/Leads/MainLeads/MainLeads";
import styles from "@/components/adminpanel/pages/Leads/leads.module.scss";

const Leads = () => {
	return (
		<>
			<TitlePage title="Список за'явок"/>
			<MainLeads />

			<div className={styles.cardWr}>

			</div>
		</>
	);
};

export default Leads;