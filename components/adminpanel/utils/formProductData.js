import {fetchBlobFromUrl} from "@/components/adminpanel/utils/fetchBlobFromUrl";
import {v4 as uuidv4} from "uuid";
import supabaseFileService from "@/components/adminpanel/services/SupabaseFileService";
import {PHOTO_STORAGE_URL} from "@/config";

export default async function (data) {
	const parsedColors = await Promise.all(data.Colors.map(async color => {
		const productImages = await Promise.all(color.ProductImages?.map(async image => {
			if (image?.url?.includes('blob')) {
				const blob = await fetchBlobFromUrl(image.url);
				const fileName = `${uuidv4()}.jpeg`
				const newFile = new File([blob], fileName, { type: blob.type });
				const data = await supabaseFileService.uploadFile(newFile, 'images', fileName, '/productImages')
				console.log(newFile.name)
				return ({name: newFile.name, url: `${PHOTO_STORAGE_URL}/${data.path}`})
			} else {
				if (image.name) {
					return image;
				}
			}
		}));
		return { ...color, ProductImages: productImages };
	}));
	console.log('PARSED COLORS =======', parsedColors)
	const parsedCriterions = data.Criterions?.map(cr => {
		return ({
			...cr,
			CriterionItems: cr.CriterionItems.map(item => {
				return ({
					name: item.name,
					name_ru: item?.name_ru,
					description: item.description,
					description_ru: item?.description_ru,
					price: Number(item.price)
				})
			})
		})
	})

	let video = data?.videos
	const isVideoExists = video?.url

	if (!isVideoExists && video !== undefined) {
		const ext = video?.name.split('.').pop();
		const fileName = `${uuidv4()}.${ext}`;
		const newVideo = await supabaseFileService.uploadFile(video, 'images', fileName, '/videos')
		video = {name: fileName, url: `${PHOTO_STORAGE_URL}/${newVideo.path}`}
	} else {
		video = {}
	}

	return JSON.stringify({
		...data,
		Colors: parsedColors,
		videos: video,
		Criterions: parsedCriterions
	})
	// console.log('NEW DATA', newData)
}