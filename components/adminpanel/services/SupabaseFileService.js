import {createClient} from "@supabase/supabase-js";

class SupabaseFileService {
	supabase;
	constructor() {
		this.supabase = createClient("https://epztumesqkzxdiftmdpj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwenR1bWVzcWt6eGRpZnRtZHBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzUwODc1OSwiZXhwIjoxOTkzMDg0NzU5fQ.cZXnPwfEIgDYe5ZJPZa-aCkzDWQc4EObucaYhBrgXJ4",{auth: {persistSession: false}});
	}

	async uploadFile(file, bucketName, fileName, path) {
		try {
			// console.log('UPLOAD', file)
			const { data, error } = await this.supabase.storage
				.from(bucketName)
				.upload(`${path+'/' || ""}${fileName}`, file);

			if (error) {
				console.error(error);
				throw Error(error)
			}
			console.log('SUPABASE ===============', data)
			return data
		} catch (e) {
			console.log(e)
			throw Error(e)
		}
	}
}

export default new SupabaseFileService();