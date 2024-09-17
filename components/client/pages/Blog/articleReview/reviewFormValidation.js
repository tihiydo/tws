import * as yup from "yup"
import { useTranslations } from "next-intl";

export const useValidation = () => {
	const validation = useTranslations("validation");
	
	const reviewFormSchema = yup.object().shape({
		name: yup.string().required(validation("required")).nullable(),
		phone: yup.string().required(validation("required")).nullable(),
		comment: yup.string().required(validation("required")).nullable(),
	})
	
	return { reviewFormSchema }
}