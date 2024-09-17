import fs from "fs";
import SupabaseFileService from "@/components/adminpanel/services/SupabaseFileService";
import {PHOTO_STORAGE_URL} from "@/config";

export const parseColorsAndUploadImages = async (Colors, files, slug) => {
	const parsedColors = await Promise.all(Colors.map(async color => {
		return {
			...color,
			ProductImages: await Promise.all(color.ProductImages.map(async image => {
				if (image?.name && !image?.url) {
					// console.log("UPLOAD IMAGE =========", image)
					const fileData = fs.readFileSync(files[image.name][0].path);
					const fileName = files[image.name][0].originalFilename;
					const file = await SupabaseFileService.uploadFile(fileData, 'images', fileName, `products/${slug}`);
					return { name: fileName, url: `${PHOTO_STORAGE_URL}/${file.path}` };
				}
				else {
					// console.log("NOT UPLOAD IMAGE =========", image)
					return image;
				}
			}))
		};
	}));
	return parsedColors;
}