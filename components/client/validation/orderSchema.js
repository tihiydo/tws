import * as yup from 'yup';

export const orderSchema = yup.object().shape({
	name: yup.string().required('Поле обов\'язкове'),
	surname: yup.string().required('Поле обов\'язкове'),
	phone: yup.string().min(19, 'Неправильно введений номер').required('Поле обов\'язкове'),
	shipping_type: yup.string().required('Поле обов\'язкове'),
	city: yup.string().when('shipping_type', {
		is: 'department',
		then: yup.string().required('Поле обов\'язкове').nullable(),
		otherwise: yup.string().optional().nullable()
	}),
	payment_type: yup.string().optional().nullable(),
	department: yup.string().when('shipping_type', {
		is: 'department',
		then: yup.string().required('Поле обов\'язкове'),
		otherwise: yup.string().optional().nullable()
	}),
	address: yup.string().when('shipping_type', {
		is: 'address',
		then: yup.string().required('Поле обов\'язкове'),
		otherwise: yup.string().optional().nullable()
	}),


	// promocode: yup.string().required('Поле обов\'язкове'),
	// img_hash: yup.string().required('Поле обов\'язкове'),
}).nullable()

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