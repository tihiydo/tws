import prisma from "@/prisma/client";
import translit from "@/utils/translit";
import {slugify} from "@/utils/slugify";

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                slug: true
            }
        })

        const updatePromises = products.map((product) => {
                const newSlug = `${slugify(product.name)}-${product.id}`

                return prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        slug: newSlug
                    }
                })
            }
        );

        await prisma.$transaction(updatePromises)

        const redirects = products.map(product => {
                return {
                    source: `/products/${product.slug}`,
                    destination: `/products/${slugify(product.name)}-${product.id}`,
                    statusCode: 301,
                }
            }
        )

        res.status(200).json({redirects})
    }
}
