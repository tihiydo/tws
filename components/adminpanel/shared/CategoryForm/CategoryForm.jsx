import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addCategorySchema} from "@/components/adminpanel/validation/addCategorySchema";
import Input from "@/components/adminpanel/shared/UI/Input/Input";
import styles from "@/components/adminpanel/shared/ProductForm/productForm.module.scss";
import CheckBoxCustom from "@/components/adminpanel/shared/UI/CheckBoxCustom/CheckBoxCustom";
import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import CreateSubcategories from "@/components/adminpanel/shared/CategoryForm/CreateSubcategories/CreateSubcategories";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {setLoading} from "@/store/userReducer";
import {useRouter} from "next/navigation";
import translit from "@/utils/translit";
import {API_URL} from "@/config";
import {IconButton} from "@mui/material";
import {FaTrash} from "react-icons/fa";

const CategoryForm = ({category, submitRequest}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(addCategorySchema),
		defaultValues: {
			name: category?.name || '',
			name_ru: category?.name_ru || '',
			order: category?.order || '',
			iconSrc: category?.iconSrc || '',
			onMain: category?.onMain || false,
			Subcategories: category?.Subcategories || []
		}
	})

	console.log(methods.watch())

	const submitHandler = async (data) => {
		try {
			dispatch(setLoading(true))
			console.log(data)
			const formData = {
				...data,
				slug: category?.slug,
				Subcategories: data?.Subcategories.map(sub => ({...sub, slug: translit(sub.name)}))
			}
			const newCategory = await submitRequest(formData);
			console.log(newCategory)
			router.push('/adminpanel/categories')
			dispatch(setLoading(false))
		} catch (e) {
			console.log(e)
			alert("ERROR", JSON.stringify(e))
			dispatch(setLoading(false))
		} finally {
			dispatch(setLoading(false))
		}
	}

	const deleteHandler = async () => {
		try {
			dispatch(setLoading(true))
			await fetch(`/api/categories/${category.slug}`, {
				method: 'DELETE'
			})
			router.push('/adminpanel/categories')
			dispatch(setLoading(false))
		} catch (e) {
			alert(JSON.stringify(e))
			dispatch(setLoading(false))
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<form onSubmit={methods.handleSubmit(submitHandler)}>
			<FormProvider {...methods}>
				<TitlePage title={category ? 'Змінити категорію' : 'Додати категорію'}/>
				<div style={{marginTop: 50, display: 'flex', gap: 30, alignItems: 'center'}}>
					<Input name={'name'} label="Ім'я" />
					<Input name={'name_ru'} label="Ім'я RU" />
					<Input name={'order'} label="Порядок" type={'number'} style={{width: 120}}/>
					<CheckBoxCustom name={'onMain'} label="На головній" />
				</div>
				<Input name={'iconSrc'} label="Посилання на іконку" style={{width: 396, marginTop: 20}} />
				<CreateSubcategories />
				<div style={{display: 'flex', gap: 15}}>
					<Button
						onClick={methods.handleSubmit(submitHandler)}
						variant="contained"
					>
						{category ? 'Змінити категорію' : 'Створити категорію'}
					</Button>
					{ category ?
						<Button
							onClick={deleteHandler}
							variant="contained"
							color={'error'}
						>
							<FaTrash size={'1.1em'}/>
						</Button>
						: null
					}
				</div>
			</FormProvider>
		</form>
	);
};

export default CategoryForm;