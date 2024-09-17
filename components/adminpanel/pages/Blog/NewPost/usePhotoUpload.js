import SupabaseFileService from "@/components/adminpanel/services/SupabaseFileService";
import { PHOTO_STORAGE_URL } from "@/config";
import { useState } from "react";

export default function usePhotoUpload(defaultImage) {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(defaultImage);
	const handelUploadPhoto = async (file) => {
		try {
			const nameFile = crypto.randomUUID();
			setLoading(true)
			const ext = file.name.split('.').pop()
			const resImg = await SupabaseFileService.uploadFile(file, 'images', `${nameFile}.${ext}`, `popup`);
			const imgUrl = `${PHOTO_STORAGE_URL}/${resImg.path}`
			setLoading(false)
			setImage({
				name: file.name,
				url: imgUrl
			})
		} catch (error) {
			setLoading(false)
		}

	}

	return {
		handelUploadPhoto,
		loading,
		image,
		setImage
	}
}