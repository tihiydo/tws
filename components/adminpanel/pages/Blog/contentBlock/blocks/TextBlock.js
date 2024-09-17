import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react"
import { DeleteBlock } from "@/components/adminpanel/pages/Blog/contentBlock/blocks/DeleteBlock";
import styles from "@/components/adminpanel/pages/Blog/contentBlock/styles.module.scss";

const EDITOR_API_KEY = "uq88a7oxqc1hin7lunrs9819h51b67i69z8xlrrmm64cxmg8"
export const TextBlock = ({
	name,
	number,
	remove,
	watch,
	isUpdate,
	setValue
}) => {
	const block = watch(name);
	const editorRef = useRef(null);
	const ruEditorRef = useRef(null);
	return (
		<div className={styles.block}>
			<div className={styles.block__col}>
				<div className={styles.block__title}>
					<div>
						Блок { number }: ТЕКСТ
					</div>
					<DeleteBlock remove={remove} />
				</div>
				<div className={styles.block__row}>
					<div className={styles.block__col}>
						<div style={{fontSize: 18}}>Текст</div>
						<Editor
							apiKey={EDITOR_API_KEY}
							onInit={(editor) =>
								(editorRef.current = editor)
							}
							onBlur={(focused, editor) =>
								setValue(
									`${name}.text`,
									editor.getContent()
								)
							}
							initialValue={
								isUpdate
									? block?.text
									: "<p>Введіть текст...</p>"
							}
							init={{
								selector: "textarea",
								plugins: [
									"advlist autolink lists link image charmap print preview anchor",
									"searchreplace visualblocks code fullscreen",
									"insertdatetime media table paste code help wordcount",
									"toc",
									"visualchars",
									"hr",
									"link",
									"imagetools",
									"autolink",
									"nonbreaking",
									"emoticons",
									"imagetools",
									"media",
									"textpattern",
									"wordcount",
									"image",
								],
								toolbar:
									"undo redo | " +
									"bold italic underline strikethrough | " +
									"alignleft aligncenter alignright alignjustify | " +
									"outdent indent | " +
									"link image media | " +
									+"bullist | numlist |" +
									+"styleselect |" +
									"charmap emoticons | " +
									"code | " +
									"table | " +
									"fullscreen | " +
									"styleselect |" +
									" image",
								menubar:
									"file edit view insert format tools table help",
								toolbar_mode: "sliding",
								contextmenu:
									"bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
								visualblocks_default_state: true,
								fontsize_formats:
									"8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
								textpattern_patterns: [
									{
										start: "*",
										end: "*",
										format: "italic",
									},
									{
										start: "**",
										end: "**",
										format: "bold",
									},
									{ start: "#", format: "h1" },
									{ start: "##", format: "h2" },
									{ start: "###", format: "h3" },
									{ start: "####", format: "h4" },
									{ start: "#####", format: "h5" },
									{ start: "######", format: "h6" },
									{
										start: "1. ",
										cmd: "InsertOrderedList",
									},
									{
										start: "* ",
										cmd: "InsertUnorderedList",
									},
									{
										start: "- ",
										cmd: "InsertUnorderedList",
									},
								],
							}}
						/>
					</div>

					<div className={styles.block__col}>
						<div style={{fontSize: 18}}>Текст RU</div>
						<Editor
							apiKey={EDITOR_API_KEY}
							onInit={(editor) =>
								(ruEditorRef.current = editor)
							}
							onBlur={(focused, editor) =>
								setValue(
									`${name}.text_ru`,
									editor.getContent()
								)
							}
							initialValue={
								isUpdate
									? block?.text_ru
									: "<p>Введіть текст...</p>"
							}
							init={{
								selector: "textarea",
								plugins: [
									"advlist autolink lists link image charmap print preview anchor",
									"searchreplace visualblocks code fullscreen",
									"insertdatetime media table paste code help wordcount",
									"toc",
									"visualchars",
									"hr",
									"link",
									"imagetools",
									"autolink",
									"nonbreaking",
									"emoticons",
									"imagetools",
									"media",
									"textpattern",
									"wordcount",
									"image",
								],
								toolbar:
									"undo redo | " +
									"bold italic underline strikethrough | " +
									"alignleft aligncenter alignright alignjustify | " +
									"outdent indent | " +
									"link image media | " +
									+"bullist | numlist |" +
									+"styleselect |" +
									"charmap emoticons | " +
									"code | " +
									"table | " +
									"fullscreen | " +
									"styleselect |" +
									" image",
								menubar:
									"file edit view insert format tools table help",
								toolbar_mode: "sliding",
								contextmenu:
									"bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
								visualblocks_default_state: true,
								fontsize_formats:
									"8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
								textpattern_patterns: [
									{
										start: "*",
										end: "*",
										format: "italic",
									},
									{
										start: "**",
										end: "**",
										format: "bold",
									},
									{ start: "#", format: "h1" },
									{ start: "##", format: "h2" },
									{ start: "###", format: "h3" },
									{ start: "####", format: "h4" },
									{ start: "#####", format: "h5" },
									{ start: "######", format: "h6" },
									{
										start: "1. ",
										cmd: "InsertOrderedList",
									},
									{
										start: "* ",
										cmd: "InsertUnorderedList",
									},
									{
										start: "- ",
										cmd: "InsertUnorderedList",
									},
								],
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};