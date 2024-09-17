import * as yup from 'yup';

export const createFormSchema = yup.object().shape({
	url: yup.string()
		.matches(/^(?!.*ru).*$/, 'URL адреса не може містити локалізацію')
		.matches(/^(?!.*\/$).*$/, 'URL адреса не може закінчуватися на "/"')
		.matches(/^https:\/\/www\.twinsann\.com/, 'URL адреса повинна починатися з "https://www.twinsann.com"')
	.required("Поле обов'язкове").nullable(),
	title: yup.string().required("Поле обов'язкове").nullable(),
	title_ru: yup.string().required("Поле обов'язкове").nullable(),
	h: yup.string().required("Поле обов'язкове").nullable(),
	h_ru: yup.string().required("Поле обов'язкове").nullable(),
	description: yup.string().required("Поле обов'язкове").nullable(),
	description_ru: yup.string().required("Поле обов'язкове").nullable(),
	text: yup.string().required("Поле обов'язкове").nullable(),
	text_ru: yup.string().required("Поле обов'язкове").nullable(),
	hideSeoText: yup.boolean().default(false),
})