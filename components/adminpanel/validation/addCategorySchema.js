import * as yup from 'yup';
export const addCategorySchema = yup.object().shape({
	name: yup.string().required('Поле обов\'язкове').nullable(),
	iconSrc: yup.string().optional().nullable(),
	order: yup.string().optional().nullable(),
	onMain: yup.boolean().optional().nullable(),
	Subcategories: yup.array().optional().nullable(),
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