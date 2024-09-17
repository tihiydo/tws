import prisma from "@/prisma/client";
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
