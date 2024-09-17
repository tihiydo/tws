import * as yup from 'yup';

const contentBlock = yup.object().shape({
	type: yup.string(),
	title: yup.string().optional(),
	title_ru: yup.string().optional(),
	text: yup.string().optional(),
	text_ru: yup.string().optional(),
	image: yup.object({
		name: yup.string().optional(),
		url: yup.string().optional()
	}).optional()
})

const products = yup.object().shape({
	productId: yup.string().required("Поле обов'язкове").nullable()
})
export const newPostSchema = yup.object().shape({
	title: yup.string().required("Поле обов'язкове").nullable(),
	title_ru: yup.string().required("Поле обов'язкове").nullable(),
	categoryId: yup.string().required("Поле обов'язкове").nullable(),
	subcategoryId: yup.string().optional(),
	description: yup.string().required("Поле обов'язкове").nullable(),
	description_ru: yup.string().required("Поле обов'язкове").nullable(),
	author: yup.string().optional(),
	withDate: yup.boolean().default(true),
	content: yup.array(contentBlock),
	products: yup.array(products)
})