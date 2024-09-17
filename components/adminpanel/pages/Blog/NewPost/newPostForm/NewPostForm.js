import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newPostSchema } from "@/components/adminpanel/pages/Blog/NewPost/newPostForm/newPostSchema";
import Button from "@mui/material/Button";

import styles from "./newPostForm.module.scss";
import Input from "@/components/adminpanel/shared/UI/Input/Input";
import FileUploader from "@/components/adminpanel/shared/UI/FileUploader/FileUploader";
import MySelect from "@/components/adminpanel/shared/UI/Select/Select";
import { useEffect, useMemo } from "react";
import { Oval } from "react-loader-spinner";
import usePhotoUpload from "@/components/adminpanel/pages/Blog/NewPost/usePhotoUpload";
import Image from "next/image";
import { LuTrash2, LuPlus } from "react-icons/lu"
import CheckBoxCustom from "@/components/adminpanel/shared/UI/CheckBoxCustom/CheckBoxCustom";
import ContentBlock from "@/components/adminpanel/pages/Blog/contentBlock";
import { transformContent } from "@/components/adminpanel/pages/Blog/NewPost/newPostForm/transformContent";
import { DeleteBlock } from "@/components/adminpanel/pages/Blog/contentBlock/blocks/DeleteBlock";

const NewPostForm = ({
	post,
	products,
	categories,
	submitHandler,
	deleteHandler
}) => {

	const isUpdate = !!post;
	const { handelUploadPhoto, loading, image, setImage } = usePhotoUpload(
		isUpdate ? JSON.parse(post.image) : null
	)

	const initialValues = {
		title: "",
		title_ru: "",
		categoryId: "",
		subcategoryId: undefined,
		description: "",
		description_ru: "",
		author: undefined,
		withDate: true,
		content: []
	}

	const defaultValues = isUpdate ? {
		title: post.title ?? "",
		title_ru: post.title_ru ?? "",
		categoryId: post.categoryId ?? "",
		subcategoryId: post.subcategoryId ?? "",
		description: post.description ?? "",
		description_ru: post.description_ru ?? "",
		author: post.author ?? "",
		products: post.Products ?? [],
		content: JSON.parse(post.content),
		withDate: post.withDate ?? true
	} : initialValues;

	const form = useForm({
		resolver: yupResolver(newPostSchema),
		defaultValues,
		mode: "onBlur"
	})

	const { fields, append, remove, } = useFieldArray({
		name: "content",
		control: form.control,
	})

	const {
		fields: productFields,
		append: productAppend,
		remove: productRemove
	} = useFieldArray({
		name: "products",
		control: form.control
	})

	const selectedProducts = form.watch("products");

	const productsOptions = (index) => {
		// get selected without active
		const selected = selectedProducts?.slice(0, index)
		const selectedIds = selected.map(item => item.productId)

		return products.filter(item => !selectedIds.includes(item.value))
	}


	const handleSavePost = (data) => {
		if(!image) return;
		const content = transformContent(data.content)
		submitHandler({
			...data,
			content,
			id: isUpdate ? post.id : null,
			image: image
		})
	}

	const selectedCategory = form.watch('categoryId')
	const categoriesOptions = categories?.map(cat => ({label: cat.name, value: cat.id}))

	const subcategoriesOptions = useMemo(() => {
		const options = categories
			?.find(cat => cat.id === form.getValues('categoryId'))
			?.Subcategories
			?.map(cat => ({label: cat.name, value: cat.id})) || []


		if(post?.categoryId !== selectedCategory) {
			form.setValue("subcategoryId", options[0]?.value ?? '');
		} else {
			form.setValue("subcategoryId", post?.subcategoryId);
		}

		return options
	}, [selectedCategory])

	return (
		<div>
			<TitlePage
				title={isUpdate ? "Редагування статті" : "Нова стаття"}
			/>

			<FormProvider {...form}>
				<form className={styles.form}>
					<div>
						<div className={styles.form__subtitle}>
							Основне:
						</div>
						<div className={styles.form__col}>
							<div className={styles.form__row}>
								<Input
									name={'title'}
									label="Заголовок"
									style={{width: "100%"}}
								/>
								<Input
									name={'title_ru'}
									label="Заголовок RU"
									style={{width: "100%"}}
								/>
							</div>
							<div className={styles.form__row}>
								<Input
									name={'author'}
									label="Автор"
									style={{width: "100%"}}
								/>
							</div>
							<div className={styles.form__row}>
								<Input
									name={'description'}
									label="Опис"
									rows={8}
									multiline
									style={{width: '100%'}}
								/>
								<Input
									name={'description_ru'}
									label="Опис RU"
									rows={8}
									multiline
									style={{width: '100%'}}
								/>
							</div>
							<div>
								<div className={styles.form__subtitle}>
									Обложка статті:
								</div>
								<div className={styles.form__col}>
									<div style={{display: "flex", gap: 16}}>
										<FileUploader
											type={'image'}
											outerFileName={image?.name}
											handleFile={handelUploadPhoto}
										/>
										<Button
											onClick={() => setImage(null)}
											startIcon={<LuTrash2 />}
											style={{borderRadius: 15}}
											variant="contained"
											size={"large"}
										>
											Видалити
										</Button>
									</div>
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
											<div className={styles.form__image}>
												<Image
													fill
													src={image.url}
													alt={image.name}
												/>
											</div> : null
									}
								</div>
							</div>
						</div>
					</div>

					<div>
						<div className={styles.form__subtitle}>
							Пов'язана категорія:
						</div>
						<div className={styles.form__row}>
							<MySelect name={'categoryId'} options={categoriesOptions} label="Категорія" />
							<MySelect name={'subcategoryId'} options={subcategoriesOptions} label="Підкатегорія"/>
						</div>
					</div>



					<div>
						<div className={styles.form__subtitle}>
							Пов'язані товари:
						</div>

						<div className={styles.form__col}>
							{
								productFields.length > 0 ?
								productFields.map((field, index) => (
									<div className={styles.form__product}>
										<MySelect
											key={field.productId}
											name={`products.${index}.productId`}
											options={productsOptions(index)}
											label="Підкатегорія"
										/>
										<DeleteBlock remove={() => productRemove(index)} />
									</div>
								)) : <div>Наразі немає пов'язаних товарів</div>
							}

							<div className={styles.form__row}>
								<Button
									onClick={() => productAppend({
										productId: ""
									})}
									startIcon={<LuPlus />}
									variant="contained"
									size={"large"}
								>
									Додати товар
								</Button>
							</div>
						</div>
					</div>

					<div className={styles.form__sections}>
						<div>
							Блоки статті:
						</div>
						{
							fields.map((field, index) => (
								<ContentBlock
									{...field}
									key={index}
									number={index+1}
									name={`content.${index}`}
									isUpdate={isUpdate}
									watch={form.watch}
									setValue={form.setValue}
									control={form.control}
									remove={() => remove(index)}
								/>
							))
						}

						<div style={{display: "flex", justifyContent: "space-between"}}>
							<Button
								onClick={() => append({
									type: "title",
								})}
								startIcon={<LuPlus />}
								variant="contained"
								size={"large"}
								style={{width: 185}}
							>
								Заголовок
							</Button>
							<Button
								onClick={() => append({
									type: "text",
								})}
								startIcon={<LuPlus />}
								variant="contained"
								size={"large"}
								style={{width: 185}}
							>
								Текст
							</Button>
							<Button
								onClick={() => append({
									type: "image",
								})}
								startIcon={<LuPlus />}
								variant="contained"
								size={"large"}
								style={{width: 185}}
							>
								Зображення
							</Button>
						</div>
					</div>

					<div className={styles.form__col} style={{width: "fit-content"}}>
						<CheckBoxCustom name={'withDate'} label="Показувати дату публікації"/>
						<div className={styles.form__row}>
							<Button
								onClick={form.handleSubmit(handleSavePost)}
								variant="contained"
								size={"large"}
								block
								style={{width: "100%"}}
							>
								{ isUpdate ? "Зберегти" : "Cтворити" }
							</Button>
							{
								isUpdate &&
								<Button
									onClick={() => deleteHandler(post?.id)}
									variant="contained"
									size={"large"}
								>
									Видалити
								</Button>
							}
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default NewPostForm;