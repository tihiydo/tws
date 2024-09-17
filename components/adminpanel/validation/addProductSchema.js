import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
	name: yup.string().required('Поле обов\'язкове').nullable(),
	name_ru: yup.string().optional().nullable(),
	price: yup.string().required('Поле обов\'язкове').nullable(),
	description: yup.string().required('Поле обов\'язкове').nullable(),
	description_ru: yup.string().optional().nullable(),
	hint: yup.string().optional().nullable(),
	hint_ru: yup.string().optional().nullable(),
	withDiscount: yup.boolean().nullable(),
	discountValue: yup.string().when('withDiscount', {
		is: true,
		then: yup.string().required('Поле обов\'язкове').nullable(),
	}),
	onMain: yup.boolean().optional().nullable(),
	onBestsellers: yup.boolean().optional().nullable(),




	category: yup.array(yup.object().shape({
		id: yup.string().optional().nullable(),
		subcategory: yup.array(yup.object().shape({
			id: yup.string().optional().nullable(),
			options: yup.array(yup.object().shape({
				label: yup.string().optional().nullable(),
				value: yup.string().optional().nullable(),
			})),
		}))
	})),




	Colors: yup.array().optional().nullable(),
	Criterions: yup.array().optional().nullable(),
})
// model Addition {
// 	id Int @id @default(autoincrement())
//
// 	idStore Store @relation(fields: [storeId], references: [id])
// 	storeId Int
//
// 	name String @db.VarChar(60)
//
// 	type_addition String  @db.VarChar(40)
// 	price         Int
// 	prefer_free   Boolean
// 	img_hash      String  @db.VarChar(50)
//
// 	status_moderation String  @db.VarChar(50)
// 	prefer_stock      Boolean @default(true)
// }