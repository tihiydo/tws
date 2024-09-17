import Main from "@/components/client/pages/Main/Main";
import MainLayout from "@/components/client/layouts/MainLayout";
import prisma from "@/prisma/client";
import {useTranslations} from "next-intl";
import {getCategories} from "@/utils/getCategories";

export async function getStaticProps(context) {

    let categoriesOnMain = await prisma.category.findMany({
        where: {
            onMain: true
        },
        include: {
            Products: {
                select: {
                    product: {
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
                            },
                            Sales: true,
                            category: true,
                            subcategory: true
                        }
                    }
                }
            },
        }
    })

    let bestsellers = await prisma.product.findMany({
        take: 15,
        where: {
            onBestsellers: true
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
            Criterions: {
                include: {
                    CriterionItems: true
                }
            },
            Review: {
                orderBy: {
                    createAt: 'desc'
                },
                where: {
                    approved: 'approve'
                }
            },
            Sales: true,
            category: true,
            subcategory: true
        }
    })

    let discounts = await prisma.product.findMany({
        take: 15,
        where: {
            withDiscount: true
        },
        orderBy: {
            discountValue: "desc"
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
            Criterions: {
                include: {
                    CriterionItems: true
                }
            },
            Review: {
                orderBy: {
                    createAt: 'desc'
                },
                where: {
                    approved: 'approve'
                }
            },
            Sales: true,
            category: true,
            subcategory: true
        }
    })

    const offer = await prisma.Offer.findMany()
    const popup = await prisma.Popup.findMany()

    let reviews = await prisma.review.findMany({
        take: 10,
        orderBy: {
            createAt: "desc",
        },
        where: {
            approved: "approve",
            rating: {
                gt: 3, // Параметр "gt" вказує, що значення rating повинно бути більше 3
              },
        },
        include: {
            Product: {
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
                        },
                    },
                    Review: true
                }
            }
        }
    })

    categoriesOnMain = JSON.stringify(categoriesOnMain);
    categoriesOnMain = JSON.parse(categoriesOnMain)

    reviews = JSON.stringify(reviews);
    reviews = JSON.parse(reviews);

    bestsellers = JSON.stringify(bestsellers);
    bestsellers = JSON.parse(bestsellers);

    discounts = JSON.stringify(discounts);
    discounts = JSON.parse(discounts)

    return {
        props: {
            categories: categoriesOnMain || [],
            offer: offer[0] || 'Помилка оферу',
            popup: popup[0] || 'Помилка Popup',
            reviews,
            bestsellers,
            discounts,
            categoryData: await getCategories(),
            messages: (await import(`@/messages/${context.locale}.json`)).default,
        },
        revalidate: 120
    }
}

const MainPage = ({ categories, reviews, bestsellers, discounts }) => {
    return (
        <Main
            categories={categories}
            reviews={reviews}
            bestsellers={bestsellers}
            discounts={discounts}
        />
    );
};

MainPage.getLayout = function getLayout(page) {
    return (
        <MainLayout title="Twinsann" categories={page.props.categoryData}>
            {page}
        </MainLayout>
    )
}

export default MainPage;