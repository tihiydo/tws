import prisma from "@/prisma/client";

export const SITE_URL = "https://www.twinsann.com";

export const staticPages = [
    `${SITE_URL}`,
    `${SITE_URL}/info/about`,
    `${SITE_URL}/info/cooperation`,
    `${SITE_URL}/info/aboutPay`,
    `${SITE_URL}/info/questions`,
    `${SITE_URL}/info/warranty`,
    `${SITE_URL}/info/pay`,
    `${SITE_URL}/info/privacyPolicy`,
    `${SITE_URL}/bestsellers`,
]


function generateSiteMap(products, categories) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${
        staticPages
            .map((page) => {
                return `
                           <url>
                               <loc>${page}</loc>
                           </url>
                        `;
            }).join("")
        }
        ${
        products
            .map(({slug}) => {
                return `
                       <url>
                           <loc>${`${SITE_URL}/products/${slug}`}</loc>
                       </url>
                    `;
            }).join("")
        }
        ${
        categories
            .map((category) => {
                return `
                       <url>
                           <loc>${`${SITE_URL}/categories/${category.slug}`}</loc>
                       </url>
                       ${category.Subcategories.map(({slug: subcategorySlug}) => {
                    return `
                                <url>
                                    <loc>${`${SITE_URL}/categories/${category.slug}/${subcategorySlug}`}</loc>
                                </url>
                            `
                }).join("")
                }
                    `
            }).join("")
    }
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({res}) {
    // We make an API call to gather the URLs for our site
    const posts = await prisma.product.findMany({
        select: {
            slug: true
        }
    })

    const services = await prisma.category.findMany({
        select: {
            slug: true,
            Subcategories: {
                select: {
                    slug: true
                }
            }
        }
    })
    const sitemap = generateSiteMap(posts, services);

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
}

export default SiteMap;