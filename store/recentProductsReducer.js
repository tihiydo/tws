"use client"
const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
	products: []
}

export default function recentProductsReducer(state = initialState, action) {
	switch(action.type) {
		case SET_PRODUCTS:
			return {...state, products: action.payload};
		default:
			return state;
	}
}
export const setRecentProducts = (products) => ({type: SET_PRODUCTS, payload: products});