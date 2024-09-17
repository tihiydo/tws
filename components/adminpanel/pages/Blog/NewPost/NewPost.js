import NewPostForm from "@/components/adminpanel/pages/Blog/NewPost/newPostForm/NewPostForm";
import { useRouter } from "next/navigation";

const NewPost = ( props ) => {

	const router = useRouter();
	async function submitHandler(data) {
		try {
			const res = await fetch(`/api/blog`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})

			if (!res.ok) {
				throw new Error(res.statusText)
			}
			return router.push("/adminpanel/blog");
		} catch (e) {
			throw e;
		}
	}
	return <NewPostForm {...props} submitHandler={submitHandler} />
};

export default NewPost;