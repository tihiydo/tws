import SchemaBlock from '../../SeoBlock/SchemaBlock';
import SeoBlock from '../../SeoBlock/SeoBlock';
import classes from './category.module.scss';
import ProductItem from "@/components/client/shared/ProductItem/ProductItem";
import Breadcrumbs from "@/components/client/shared/Breadcrumbs/Breadcrumbs";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import {useTranslations} from "next-intl";
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import SeoText from "@/components/client/SeoBlock/SeoText";

export default function Category({seo, products, categoryName, isSubcategory, category, subcategory}) {

	const fullLink = categoryName === 'Bestsellers'
	 ? `${process.env.NEXT_PUBLIC_API_URL}/bestsellers` 
	 : `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.slug}`

	

	const dbTranslate = useDynamicTranslate()

	const pathname = usePathname();

	const info = useTranslations('info')


	const breadcrumbs = useMemo(() => {
		if (categoryName === 'Bestsellers') {
			return [
				{text: info('home'), href: '/'},
				{text: 'Bestsellers', href: `/bestsellers`},
			]
		}


		if (isSubcategory) {
			return [
				{text: info('home'), href: '/'},
				{text: dbTranslate(category, 'name'), href: `/categories/${category.slug}`},
				{text: dbTranslate(subcategory, 'name'), href: `/categories/${category.slug}/${subcategory.slug}`},
			]
		} else {
			return [
				{text: info('home'), href: '/'},
				{text: dbTranslate(category, 'name'), href: `/categories/${category.slug}`},
			]
		}

	}, [pathname])

	const schemaBreadcrumbs = breadcrumbs.map(item => ({...item, href: `${process.env.NEXT_PUBLIC_API_URL}${item.href}`}))

	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": schemaBreadcrumbs.map((item, index, array) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": item.text,
			"item": index + 1 === array.length ? undefined : item.href
		}))
	}

	return (
		<>
			<SeoBlock
				title={!!seo && dbTranslate(seo, "title")}
				description={!!seo && dbTranslate(seo, "description")}
                ogImageUrl={products[0]?.Colors[0]?.ProductImages[0]?.image.url}
			/>
			<SchemaBlock schema={schema} />
			<div className={classes.categoryWrapper}>
				<h1 className={classes.categoryTitle}>
					{
						!!seo ?
							dbTranslate(seo, "h") : <>{info('category')} {categoryName}</>
					}
				</h1>
				<div style={{marginBottom: 35}}>
					<Breadcrumbs links={breadcrumbs}/>
				</div>

				<div className={classes.categoryPage}>
					{products?.map(product =>
						<ProductItem key={product.id} product={product}/>
					)}
				</div>

				<SeoText seo={seo} />
			</div>
		</>
	);
};