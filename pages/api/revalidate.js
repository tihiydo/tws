import prisma from "@/prisma/client";

export const staticPages = [
    `/`,
    `/blog`,
    `/info/about`,
    `/info/cooperation`,
    `/info/aboutPay`,
    `/info/questions`,
    `/info/warranty`,
    `/info/pay`,
    `/info/privacyPolicy`,
    `/bestsellers`,
]

function getAllSitePaths(products, categories, blogPosts) {
    const productPaths = products
        .map(({slug}) => {
            return `/products/${slug}`
        })

    const blogPaths = blogPosts
        .map(({slug}) => {
            return `/blog/${slug}`
        })


    const categoriesAndSubcategoriesPaths = [];

    categories.forEach((category) => {
        categoriesAndSubcategoriesPaths
            .push(`/categories/${category.slug}`)
        category.Subcategories
            .forEach((subcategory) => {
                categoriesAndSubcategoriesPaths
                    .push(`/categories/${category.slug}/${subcategory.slug}`)
            })
    })


    const ukPages = [...staticPages, ...productPaths, ...blogPaths, ...categoriesAndSubcategoriesPaths]
    const ruPages = ukPages.map((item, index) => {
        if (index === 0) {
            return '/ru'
        }

        return `/ru${item}`
    })

    return [...ukPages, ...ruPages]
}


export default async function handler(req, res) {
    // // Check for secret to confirm this is a valid request
    // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    //     return res.status(401).json({message: 'Invalid token'})
    // }

    try {

        const products = await prisma.product.findMany({
            select: {
                slug: true
            }
        })

        const blogPosts = await prisma.post.findMany({
            select: {
                slug: true
            }
        })

        const categories = await prisma.category.findMany({
            select: {
                slug: true,
                Subcategories: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        const pages = getAllSitePaths(products, categories, blogPosts)

        await Promise.all(pages.map(async (page) => {
            try {
                await res.revalidate(page)
            } catch (e) {
                console.log("REVALIDATE ERROR", e)
            }
        }))

        return res.json({revalidated: true, pages})
    } catch (err) {
        return res.status(500).send('Error revalidating', err)
    }
}