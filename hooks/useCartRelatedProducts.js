import { useMemo } from "react";
import { useSelector } from "react-redux";

export function useCartRelatedProducts(dbProducts, categoryId) {
	const { relatedProducts } = useSelector(state => state.cart);

	const transformedProducts = useMemo(() => {
		return transformRelated(relatedProducts, dbProducts)
	}, [categoryId]);

	return transformedProducts
}

function transformRelated(currentState, newState) {
	try {
		const related = [...currentState, ...newState]
		const cleanRelated = related.reduce((acc, item) => {
			if (!acc.find(v => v.id === item.id)) {
				acc.push(item);
			}
			return acc;
		}, [])

		const shuffleArr = shuffle(cleanRelated).slice(0, 15)
		return shuffleArr.sort((a, b) => b.discountValue - a.discountValue)
	} catch (e) {
		return newState
	}
}

export const shuffle = (arr) => {
	return arr.sort(() => 0.5 - Math.random());
}