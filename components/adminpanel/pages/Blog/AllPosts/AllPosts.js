
import styles from "./allPosts.module.scss";
import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import Button from "@mui/material/Button";
import { LuPlus } from "react-icons/lu"
import ArticleCard from "@/components/client/pages/Blog/articleCard/ArticleCard";

const AllPosts = ({ posts }) => {
	return (
		<div className={styles.blog}>
			<div className={styles.blog__header}>
				<TitlePage title="Всі статті"/>
				<Button
					href={"/adminpanel/blog/new"}
					startIcon={<LuPlus />}
					variant="contained"
					size={"large"}
				>
					Створити
				</Button>
			</div>

			<div className={styles.blog__articles}>
				{
					posts.map(item => (
						<ArticleCard post={item} variant={"admin"}/>
					))
				}
			</div>
		</div>
	);
};

export default AllPosts;