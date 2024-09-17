import RSS from "rss";
import prisma from "@/prisma/client";

export const getServerSideProps = async (ctx) => {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            price: true,
            slug: true,
            category: {
                select: {
                    name: true
                }
            },
            Colors: true,
            ProductImages: {
                orderBy: {
                    order: 'asc'
                },
                select: {
                    image: true
                }
            }
        }
    });



    const feed = new RSS({
        title: `Twinsann`,
        description: "Купити пуфи, стільці в Україні, Вінниці. Пуфи 5 в 1",
        language: "uk",
        copyright: `©${new Date().getFullYear()} Twinsann`,
        site_url: 'https://twinsann.com',
        feed_url: `https://twinsann.com/feed`,
        custom_namespaces: {
            'g': 'http://base.google.com/ns/1.0'
        },
    });

    products.forEach((product) => {
        feed.item({
            title: product.name,
            description: product.description,
            guid: product.id,
            url: `https://twinsann.com/products/${product.slug}`,

            custom_elements: [
                {'g:price': `${product?.price} UAH`},
                {'g:id': product.id},
                {'g:availability': "in stock"},
                {'g:condition': "new"},
                {'g:age_group': "adult"},
                {'g:identifier_exists': `no`},
                {'g:product_type': product.category.name},
                {'g:google_product_category': product.category.name},
                {'g:color': product?.Colors?.map(color => color?.name).join('/')},
                {'g:image_link': product?.ProductImages?.[0]?.image?.url},

                {'g:shipping': [
                        {'g:country': 'UA'},
                        {'g:price': `${product.price} UAH`},
                    ]},

            ]
        });
    });

    const cacheMaxAgeUntilStaleSeconds = 60 * 60; // 1 minute
    const cacheMaxAgeStaleDataReturnSeconds = 60 * 60 * 60; // 60 minutes
//   ctx.res.setHeader(
//     "Cache-Control",
//     `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
//   );

    ctx.res.setHeader("Content-Type", "text/xml");
    ctx.res.write(feed.xml());
    ctx.res.end();

    return { props: {} };
};

// Default export to prevent next.js errors
export default function RssPage() {}