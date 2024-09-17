import prisma from "@/prisma/client";
import {formColorsQueryWithUploadedImages, formCriterionsQuery} from "@/utils/formQueries";
import {slugify} from "@/utils/slugify";

const getProducts = async (req, res) => {
    try {
        const query = req.query;
        const products = await prisma.product.findMany({
            where: {
                category: {
                    slug: query.category
                },
                subcategory: {
                    slug: query.subcategory
                },
            },
            include: {
                Colors: {
                    include: {
                        ProductImages: {
                            orderBy: {
                                order: 'asc'
                            },
                            include: {
                                image: true
                            }
                        }
                    }
                },
                Review: {
                    where: {
                        approved: 'approve'
                    }
                }
            }
        })

        if (!products.length) {
            return res.status(404).json({message: 'Not Found'})
        }

        return res.status(200).json({message: 'good', products})
    } catch (e) {
        throw e
    }
}
const createProducts = async (req, res) => {
    try {
        const body = req.body;

        const CriterionsQuery = formCriterionsQuery(body.Criterions);

        const newProduct = await prisma.product.create({
            data: {
                slug: `${slugify(body.name)}`,
                name: body.name,
                name_ru: body?.name_ru,
                price: Number(body.price),
                hint: body?.hint,
                hint_ru: body?.hint_ru,
                description: body.description || null,
                description_ru: body?.description || null,
                language: body.language || 'ua',
                onMain: body.onMain,
                videos: body.videos,
                onBestsellers: body.onBestsellers,
                withDiscount: body.withDiscount,
                discountValue: Number(body.discountValue),

                Criterions: {
                    create: CriterionsQuery
                },
            },
        })


        const createCategoryPromise = prisma.categoryOnProduct.createMany({
            data: body.category.map(item => ({
                productId: newProduct.id,
                categoryId: item.id
            }))
        })

        const createSubcategoryPromises = body.category.map(item => {
            return prisma.subcategoryOnProduct.createMany({
                data: item.subcategory.map(sub => ({
                    productId: newProduct.id,
                    subcategoryId: sub.id,
                }))
            })
        })

        await prisma.$transaction([
            createCategoryPromise,
            ...createSubcategoryPromises
        ])

        const ColorsQuery = await formColorsQueryWithUploadedImages(body.Colors, newProduct.id)

        const updatedProduct = await prisma.product.update({
            where: {
                id: newProduct.id
            },
            data: {
                slug: `${slugify(body.name)}-${newProduct.id}`,
                Colors: {
                    create: ColorsQuery
                }
            }
        })

        return res.status(200).json({message: 'good', product: updatedProduct})

    } catch (e) {
        throw e
    }
}

const updateProduct = async (req, res) => {
    try {
        const body = req.body;
        const CriterionsQuery = formCriterionsQuery(body.Criterions);
        await prisma.Criterion.deleteMany({
            where: {
                productId: body.id
            },
        })


        await prisma.ProductImage.deleteMany({
            where: {
                productId: body.id
            }
        })
        prisma.Color.deleteMany({
            where: {
                productId: body.id
            }
        })
        await prisma.color.deleteMany({
            where: {
                Products: {
                    some: {
                        id: body.id
                    }
                }
            }
        });

        const newProduct = await prisma.product.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name,
                slug: `${slugify(body.name)}-${body.id}`,
                name_ru: body?.name_ru,
                hint: body?.hint,
                hint_ru: body?.hint_ru,
                price: Number(body.price),
                description: body.description || 'опис',
                description_ru: body.description_ru || 'описание',
                language: body.language || 'ua',
                onMain: body.onMain,
                videos: body.videos,
                onBestsellers: body.onBestsellers,
                withDiscount: body.withDiscount,
                discountValue: Number(body.discountValue),

                Criterions: {
                    create: CriterionsQuery
                },
            },
        })


        const deleteCategoryPromise = prisma.categoryOnProduct.deleteMany({
            where: {
                productId: body.id
            }
        })
        const deleteSubcategoryPromise = prisma.subcategoryOnProduct.deleteMany({
            where: {
                productId: body.id
            }
        })

        const updateCategoryPromise = prisma.categoryOnProduct.createMany({
            data: body.category.map(item => ({
                productId: body.id,
                categoryId: item.id
            }))
        })

        const updateSubcategoryPromises = body.category.map(item => {
            return prisma.subcategoryOnProduct.createMany({
                data: item.subcategory.map(sub => ({
                    productId: body.id,
                    subcategoryId: sub.id,
                }))
            })
        })

        await prisma.$transaction([
            deleteCategoryPromise,
            deleteSubcategoryPromise,
            updateCategoryPromise,
            ...updateSubcategoryPromises
        ])

        const ColorsQuery = await formColorsQueryWithUploadedImages(body.Colors, newProduct.id)

        await prisma.product.update({
            where: {
                id: newProduct.id
            },
            data: {
                Colors: {
                    create: ColorsQuery
                }
            }
        })
        res.status(200).json({message: 'good'})

        // const body = JSON.parse(req.body);
    } catch (e) {
        throw e
    }
}

export default async function handler(req, res) {
    try {
        const method = req.method;
        switch (method) {
            case 'GET':
                await getProducts(req, res);
                break;
            case 'POST':
                await createProducts(req, res);
                break;
            case 'PUT':
                await updateProduct(req, res);
                break;
            default:
                await getProducts(req, res);
                break;
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}