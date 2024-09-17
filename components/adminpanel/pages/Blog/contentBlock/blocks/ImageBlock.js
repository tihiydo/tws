import { DeleteBlock } from "@/components/adminpanel/pages/Blog/contentBlock/blocks/DeleteBlock";
import FileUploader from "@/components/adminpanel/shared/UI/FileUploader/FileUploader";
import usePhotoUpload from "@/components/adminpanel/pages/Blog/NewPost/usePhotoUpload";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import styles from "@/components/adminpanel/pages/Blog/contentBlock/styles.module.scss";
import { useEffect } from "react";

export const ImageBlock = ({
	name,
	remove,
	isUpdate,
	setValue,
	watch,
	number
}) => {
	const block = watch(name);
	const { handelUploadPhoto, loading, image, setImage } = usePhotoUpload(
		isUpdate ? block.image : null
	)

	useEffect(() => {
		if(image) {
			setValue(
				`${name}.image`,
				image
			)
		}
	}, [image]);
	return (
		<div className={styles.block}>
			<div className={styles.block__col}>
				<div className={styles.block__title}>
					<div>
						Блок { number }: ЗОБРАЖЕННЯ
					</div>
					<DeleteBlock remove={() => {
						setImage(null)
						remove()
					}} />
				</div>
				<FileUploader
					type={'image'}
					outerFileName={image?.name}
					handleFile={handelUploadPhoto}
				/>
				<Oval
					height={35}
					width={35}
					color="#4fa94d"
					wrapperStyle={{}}
					wrapperClass=""
					visible={loading}
					ariaLabel='oval-loading'
					secondaryColor="#4fa94d"
					strokeWidth={5}
					strokeWidthSecondary={4}
				/>
				{
					image ?
						<div className={styles.block__image}>
							<Image
								fill
								src={image.url}
								alt={image.name}
							/>
						</div> : null
				}
			</div>
		</div>
	);
};