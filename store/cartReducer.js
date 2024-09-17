"use client"
import products from "@/pages/adminpanel/products";

const SET_IS_MODAL_CART_VISIBLE = 'SET_IS_MODAL_CART_VISIBLE';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const INCREASE_PRODUCT_COUNT = 'INCREASE_PRODUCT_COUNT';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';
const RESET_CART = 'RESET_CART';
const SET_CART = 'SET_CART';
const SET_ORDER_INFO = 'SET_ORDER_INFO';
const SET_PRICE = 'SET_PRICE';
const RESET_ORDER_INFO = 'RESET_ORDER_INFO';
const SET_IS_FREE_SHIPPING = 'SET_IS_FREE_SHIPPING';
const SET_IS_SUCCESSFUL = 'SET_IS_SUCCESSFUL';

const initialState = {
    isModalCartVisible: false,
    products: [],
    relatedProducts: [],
    price: 0,
    isFreeShipping: false,
    isSuccessful: false
}

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case SET_IS_MODAL_CART_VISIBLE:
            return {...state, isModalCartVisible: action.payload};
        case ADD_PRODUCT_TO_CART:
                const productToAdd = {...action.payload, count: 1}
                return {
                    ...state,
                    products: [...state.products, productToAdd],
                };
        case "ADD_RELATED_PRODUCTS": {
            return {
                ...state,
                relatedProducts: [...action?.payload]
            }
        }
        case INCREASE_PRODUCT_COUNT:
            return {...state, products: [...state.products.map(pr => pr.itemHash === action.payload ? {...pr, count: pr.count + 1} : pr)]};
        case REMOVE_PRODUCT_FROM_CART:
            return {...state, products: [...state.products.map(pr => pr.itemHash === action.payload && pr.count > 1 ? {...pr, count: pr.count - 1} : pr)]};
        case DELETE_PRODUCT_FROM_CART:
            const relatedProducts = state.products.length === 1 ? [] : state.relatedProducts
            return {
                ...state,
                products: [...state.products.filter(pr => pr.itemHash !== action.payload)],
                relatedProducts: [...relatedProducts]
            };
        case RESET_CART:
            return {
                ...state,
                products: [],
                relatedProducts: []
            };
        case SET_CART:
            return {...state, products: action.payload};
        case SET_ORDER_INFO:
            return {...state, orderInfo: action.payload};
        case RESET_ORDER_INFO:
            return {...state, orderInfo: null};
        case SET_PRICE:
            return {...state, price: action.payload};
        case SET_IS_FREE_SHIPPING:
            return {...state, isFreeShipping: action.payload};
        case SET_IS_SUCCESSFUL:
            return {...state, isSuccessful: action.payload};
        default:
            return state;
    }
}

export const setIsModalCartVisibleAction = (boolean) => ({type: SET_IS_MODAL_CART_VISIBLE, payload: boolean});
export const addProductToCartAction = (products) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: products
});
export const addRelatedProducts = (products) => ({
    type: "ADD_RELATED_PRODUCTS",
    payload: products
})
export const removeProductFromCartAction = (productHash) => ({type: REMOVE_PRODUCT_FROM_CART, payload: productHash});
export const increaseProductCountAction = (productHash) => ({type: INCREASE_PRODUCT_COUNT, payload: productHash});
export const deleteProductFromCartAction = (productHash) => ({type: DELETE_PRODUCT_FROM_CART, payload: productHash});
export const resetCartAction = () => ({type: RESET_CART});
export const setCartAction = (cart) => ({type: SET_CART, payload: cart});
export const setIsFreeShipping = (boolean) => ({type: SET_IS_FREE_SHIPPING, payload: boolean});
export const setIsSuccessfulAction = (boolean) => ({type: SET_IS_SUCCESSFUL, payload: boolean});
export const setOrderInfoAction = (formData) => ({type: SET_ORDER_INFO, payload: formData});
export const resetOrderInfoAction = () => ({type: RESET_ORDER_INFO});
export const setOrderPriceAction = (newPrice) => ({type: SET_PRICE, payload: newPrice});