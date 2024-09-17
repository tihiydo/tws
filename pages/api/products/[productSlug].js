import prisma from "@/prisma/client";

const getProduct = async (req, res) => {
    const {productSlug} = req.query;

    if (!product) {
       return res.status(404).json({message: 'not found'})
    }
    return res.status(200).json({message: 'good', product: product})
}

const deleteProduct = async (req, res) => {
    const {productSlug} = req.query;
    const product = await prisma.product.delete({
        where: {
            slug: productSlug
        }
    })
    await prisma.Criterion.deleteMany({
        where: {
            productId: product.id
        },
    })
    await prisma.ProductImage.deleteMany({
        where: {
            productId: product.id
        }
    })
    prisma.Color.deleteMany({
        where: {
            productId: product.id
        }
    })
    await prisma.color.deleteMany({
        where: {
            Products: {
                some: {
                    id: product.id
                }
            }
        }
    });
    return res.status(200).json({message: 'deleted', product: product})
}

export default async function handler(req, res) {
    try {
        const method = req.method;
        switch (method) {
            case 'GET':
                await getProduct(req, res);
                break;
            case 'POST':
                // await createProducts(req, res);
                break;
            case 'DELETE':
                await deleteProduct(req, res);
                break;
            default:
                await getProduct(req, res);
                break;
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}