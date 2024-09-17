import prisma from "@/prisma/client";

export const getCategories = async () => {
    return prisma.category.findMany({
        orderBy: {
            order: 'asc'
        },
        include: {
            Subcategories: true
        }
    })
}