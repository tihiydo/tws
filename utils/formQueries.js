import {parseColorsAndUploadImages} from "@/utils/parseColorsAndUploadImages";

export const formCriterionsQuery = (Criterions) => {
	return Criterions.map(criterion => {
		const obj = {
			name: criterion.name,
			name_ru: criterion?.name_ru,
			description: criterion.description,
			description_ru: criterion?.description_ru,
			CriterionItems: {
				create: [
					...criterion.CriterionItems
				]
			}
		}
		return obj;
	})
}

export const formColorsQueryWithUploadedImages = async (Colors, productId) => {
	const ColorsQuery =
		Colors.map(color => {
			return ({
				name: color.name,
				ProductImages: {
					create: [
						...color.ProductImages.map((image, index) => {
							if (image?.url) {
								return ({
									image: {create: image},
									order: index + 1,
									product: { connect: { id: productId } }
								})
							}
						})
					]
				}
			})
		})
	return ColorsQuery;
}