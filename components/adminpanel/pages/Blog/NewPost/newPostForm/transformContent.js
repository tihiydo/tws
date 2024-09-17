
export const transformContent = (data) => {
	const filteredContent = data.filter(item => {
		const isTitle =
			item.title && item.title_ru
			&& item.title !== "" && item.title_ru !== ""
		const isText =
			item.text && item.text_ru
			&& item.text !== "" && item.text_ru !== ""
		const isImage = item.image.url

		return isTitle || isText || isImage;
	})

	return filteredContent;
}