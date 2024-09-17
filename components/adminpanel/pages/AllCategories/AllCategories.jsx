import classes from './allCategories.module.scss'
import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import {useRouter} from "next/navigation";
const AllCategories = ({categories}) => {
	const router = useRouter()
	return (
		<div className={classes.allCategories}>
			<TitlePage title="Всі категорії"/>
			<div className={classes.items}>
				{categories.map(cat =>
					<div
						key={cat.id}
						className={classes.item}
						onClick={() => router.push(`/adminpanel/categories/${cat.slug}`)}
					>
						<div className={classes.title}>
							<div className={classes.name}>{cat.name}</div>
							{cat?.Subcategories?.length ?
								<div className={classes.subcategories}>
									{cat.Subcategories.map(subcat =>
										<div key={subcat.id} className={classes.subcategory_name}>{subcat.name}</div>
									)}
								</div>
								: null
							}
						</div>
						<div>{cat.order}</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllCategories;