import styles from "@/components/client/shared/ModalCart/ModalCartItem/modalCartItem.module.scss";
import Image from "next/image";

const OrderModalItem = ({product}) => {
	const productPrice = product?.count * product?.price;

	return (
		<div className={styles.modalCartItem}>
			<div className={styles.image}>
				{product?.imageUrl
					? <Image src={product?.imageUrl} alt={product?.product?.name} fill />
					: null
				}
			</div>
			<div className={styles.content}>
				<div className={styles.title}>
					{product.product.name}
				</div>
				<div className={styles.color}>
					<span>
						Колір:
					</span>
					<div style={{backgroundColor: product?.color}} className={styles.color_round} />
				</div>
				{product.Criterions.map(cr =>
					<div key={cr.selected.id} className={styles.description}>
						<span>
							{cr.name}:
						</span>
						<span>
							{cr.selected.name}
						</span>
					</div>
				)}
			</div>
			<div className={styles.controls}>
				<div className={styles.controls_count}>
					<span>{product?.count} шт.</span>
				</div>
			</div>
			<div className={styles.price}>
				{productPrice + '₴'}
			</div>
		</div>
	);
};

export default OrderModalItem;