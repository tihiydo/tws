import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import { FormProvider, useForm } from "react-hook-form";

import styles from "./createForm.module.scss";
import Input from "@/components/adminpanel/shared/UI/Input/Input";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createFormSchema } from "@/components/adminpanel/pages/Seo/NewRecord/createForm/createFormSchema";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from "@mui/material";
import CheckBoxCustom from "@/components/adminpanel/shared/UI/CheckBoxCustom/CheckBoxCustom";

const EDITOR_API_KEY = "uq88a7oxqc1hin7lunrs9819h51b67i69z8xlrrmm64cxmg8"

const CreateForm = ({ record, submitHandler, deleteHandler, loading, isDelete }) => {
	const isUpdate = !!record;
	const editorRef = useRef(null);
	const ruEditorRef = useRef(null);

	const initialValues = {
		title: "",
		title_ru: "",
		h: "",
		h_ru: "",
		description: "",
		description_ru: "",
		text: "<p></p>",
		text_ru: "<p></p>",
		hideSeoText: false
	}
	const defaultValues = isUpdate ? record : initialValues

	const form = useForm({
		resolver: yupResolver(createFormSchema),
		defaultValues,
		mode: "onBlur"
	})

	return (
		<>
			<div>
				<div className={styles.form__row}>
					<TitlePage
						title={isUpdate ? "Редагування запису" : "Новий запис"}
					/>
					<div style={{ display: "flex", gap: 16, justifySelf: "flex-end" }}>
						{
							isUpdate &&
								<Button
									onClick={() => deleteHandler(record.id)}
									variant="contained"
									startIcon={
										isDelete && <CircularProgress
											color={"secondary"}
											size={20}
										/>
									}
									size={"large"}
									style={{ maxWidth: 144 }}
								>
									Видалити
								</Button>
						}
						<Button
							onClick={form.handleSubmit(submitHandler)}
							variant="contained"
							startIcon={
								loading && <CircularProgress
									color={"secondary"}
									size={20}
								/>
							}
							size={"large"}
							style={{ maxWidth: 144 }}
						>
							{isUpdate ? "Зберегти" : "Cтворити"}
						</Button>
					</div>
				</div>

				<FormProvider {...form} >
					<form className={styles.form}>
						<Input
							disabled={isUpdate}
							name={'url'}
							label="URL адреса"
							style={{ width: "100%" }}
						/>
						<div className={styles.form__row}>
							<Input
								name={'title'}
								label="Заголовок"
								style={{ width: "100%" }}
							/>
							<Input
								name={'title_ru'}
								label="Заголовок RU"
								style={{ width: "100%" }}
							/>
						</div>
						<div className={styles.form__row}>
							<Input
								name={'h'}
								label="H1"
								style={{ width: "100%" }}
							/>
							<Input
								name={'h_ru'}
								label="H1 RU"
								style={{ width: "100%" }}
							/>
						</div>
						<div className={styles.form__row}>
							<Input
								name={'description'}
								label="Опис"
								rows={8}
								multiline
								style={{ width: "100%" }}
							/>
							<Input
								name={'description_ru'}
								label="Опис RU"
								rows={8}
								multiline
								style={{ width: "100%" }}
							/>
						</div>
						<div className={styles.form__col}>
							<div className={styles.form__row}>
								<div className={styles.form__col}>
									<div style={{ fontSize: 18 }}>Seo текст</div>
									<Editor
										apiKey={EDITOR_API_KEY}
										onInit={(editor) => (editorRef.current = editor)}
										onBlur={(focused, editor) => {
											form.setValue("text", editor.getContent())
										}}
										initialValue={defaultValues.text}
										init={{
											selector: "textarea",
											plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount", "toc", "visualchars", "hr", "link", "imagetools", "autolink", "nonbreaking", "emoticons", "imagetools", "media", "textpattern", "wordcount", "image",],
											toolbar: "undo redo | " + "bold italic underline strikethrough | " + "alignleft aligncenter alignright alignjustify | " + "outdent indent | " + "link image media | " + +"bullist | numlist |" + +"styleselect |" + "charmap emoticons | " + "code | " + "table | " + "fullscreen | " + "styleselect |" + " image",
											menubar: "file edit view insert format tools table help",
											toolbar_mode: "sliding",
											contextmenu: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
											visualblocks_default_state: true,
											fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
											textpattern_patterns: [{
												start: "*", end: "*", format: "italic",
											}, {
												start: "**", end: "**", format: "bold",
											}, { start: "#", format: "h1" }, { start: "##", format: "h2" }, {
												start: "###", format: "h3"
											}, { start: "####", format: "h4" }, {
												start: "#####", format: "h5"
											}, { start: "######", format: "h6" }, {
												start: "1. ", cmd: "InsertOrderedList",
											}, {
												start: "* ", cmd: "InsertUnorderedList",
											}, {
												start: "- ", cmd: "InsertUnorderedList",
											},],
										}}
									/>
								</div>
								<div className={styles.form__col}>
									<div style={{ fontSize: 18 }}>Seo текст RU</div>
									<Editor
										apiKey={EDITOR_API_KEY}
										onInit={(editor) => (ruEditorRef.current = editor)}
										onBlur={(focused, editor) => {
											form.setValue("text_ru", editor.getContent())
										}}
										initialValue={defaultValues.text_ru}
										init={{
											selector: "textarea",
											plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount", "toc", "visualchars", "hr", "link", "imagetools", "autolink", "nonbreaking", "emoticons", "imagetools", "media", "textpattern", "wordcount", "image",],
											toolbar: "undo redo | " + "bold italic underline strikethrough | " + "alignleft aligncenter alignright alignjustify | " + "outdent indent | " + "link image media | " + +"bullist | numlist |" + +"styleselect |" + "charmap emoticons | " + "code | " + "table | " + "fullscreen | " + "styleselect |" + " image",
											menubar: "file edit view insert format tools table help",
											toolbar_mode: "sliding",
											contextmenu: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
											visualblocks_default_state: true,
											fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
											textpattern_patterns: [{
												start: "*", end: "*", format: "italic",
											}, {
												start: "**", end: "**", format: "bold",
											}, { start: "#", format: "h1" }, { start: "##", format: "h2" }, {
												start: "###", format: "h3"
											}, { start: "####", format: "h4" }, {
												start: "#####", format: "h5"
											}, { start: "######", format: "h6" }, {
												start: "1. ", cmd: "InsertOrderedList",
											}, {
												start: "* ", cmd: "InsertUnorderedList",
											}, {
												start: "- ", cmd: "InsertUnorderedList",
											},],
										}}
									/>
								</div>
							</div>

							<CheckBoxCustom name={'hideSeoText'} label="Приховати Seo текст"/>

						</div>
					</form>
				</FormProvider>
			</div>
		</>)
}

export default CreateForm;