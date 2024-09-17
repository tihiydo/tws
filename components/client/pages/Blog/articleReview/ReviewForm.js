import { useState } from "react";
import { Rating, TextField } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidation } from "@/components/client/pages/Blog/articleReview/reviewFormValidation";
import Input from "@/components/adminpanel/shared/UI/Input/Input";
import InputMask from "react-input-mask";
import classes from "@/components/client/pages/Order/order.module.scss";
import Button from "@/components/shared/UI/Button/Button";
import { useTranslations } from "next-intl";


const ReviewForm = ({ submitHandler }) => {
	const [stars, setStars] = useState(0);
	const buttons = useTranslations("buttons");
	const t = useTranslations("form");
	const { reviewFormSchema } = useValidation();

	const defaultValues = {
		name: "",
		phone: "",
		comment: ""
	}
	const form = useForm({
		resolver: yupResolver(reviewFormSchema),
		defaultValues,
		mode: "onBlur"
	})

	const handleSubmit = (data) => {
		submitHandler({
			...data,
			rating: stars
		})
	}

	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<Rating
						size="large"
						style={{marginBottom: 20}}
						onChange={(event, newValue) => {
							setStars(newValue);
						}}
					/>
					<Input
						name={'name'}
						label={t("name")}
						style={{width: "100%"}}
					/>
					<Controller
						name="phone"
						control={form.control}
						placeholder={'+380 (99) 999-99-99'}
						defaultValue=""
						render={({ field }) => (
							<InputMask
								mask="+380 (99) 999-99-99"
								maskChar={null}
								value={field.value}
								onChange={field.onChange}
							>
								{(inputProps) => (
									<TextField
										{...inputProps}
										color={'primary'}
										size={'small'}
										className={classes.input}
										error={!!form.formState.errors['phone']}
										helperText={form.formState.errors['phone']?.message ?? ''}
										label={t("phone")}
									/>
								)}
							</InputMask>
						)}
					/>

					<Input
						name={'comment'}
						label={t("review")}
						rows={8}
						multiline
						style={{width: '100%'}}
						required
					/>
					<Button variant="contained" type="submit" style={{marginTop: 20}}>
						{
							buttons("feedback")
						}
					</Button>
				</form>
			</FormProvider>
		</>
	)
}

export default ReviewForm;