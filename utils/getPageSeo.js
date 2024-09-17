import prisma from "@/prisma/client";

export async function getPageSeo(url) {

	let seo = await prisma.seo.findFirst({
		where: {
			url: { contains: url }
		},
	})
	seo = JSON.stringify(seo);
	seo = JSON.parse(seo);

	return seo;
}