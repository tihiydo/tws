import NewPostForm from "@/components/adminpanel/pages/Blog/NewPost/newPostForm/NewPostForm";
import { useRouter } from "next/navigation";

const EditPost = ( props ) => {

	const router = useRouter();
	async function submitHandler(data) {
		try {
			const res = await fetch(`/api/blog`, {
				method: 'PUT',
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

	async function deleteHandler(id) {
		try {
			const res = await fetch(`/api/blog`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id })
			})

			if (!res.ok) {
				throw new Error(res.statusText)
			}
			return router.push("/adminpanel/blog");
		} catch (e) {
			throw e;
		}
	}
	return <NewPostForm {...props} submitHandler={submitHandler} deleteHandler={deleteHandler}/>
};

export default EditPost;