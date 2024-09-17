import {
    checkOutFirstStepDataLayer,
    checkOutSecondStepDataLayer,
    purchaseDataLayer
} from "../helpers/dataLayers.js";
import {formBasketItemData} from "../helpers/getDataFromItem.js";

// VIEW CART
export const checkOutStepOne = (basketItems) => {
    try {
        // console.log('STEP 1')
        const formedBaskedItems = basketItems.map(item => {
            return formBasketItemData(item)
        })

        const price = formedBaskedItems?.reduce((acc, item) => {
            return acc += item?.price * item?.quantity
        }, 0)

        checkOutFirstStepDataLayer(formedBaskedItems, "UAH", price)

    } catch (e) {
        console.log(e);
    }
}

//GO TO ORDER

export const checkOutStepTwo = (basketItems) => {
    try {
        // console.log('STEP 2')
        const formedBaskedItems = basketItems?.map(item => {
            return formBasketItemData(item)
        })
        const price = formedBaskedItems?.reduce((acc, item) => {
            return acc += item?.price * item?.quantity
        }, 0)

        if (formedBaskedItems.length) {
            checkOutSecondStepDataLayer(formedBaskedItems, "UAH", price)
        }
    } catch (e) {
        console.log(e);
    }
}

//Purchase
export const checkOutStepFour = (basketItems) => {
    try {
        // console.log('STEP 4')
        const formedBaskedItems = basketItems?.map(item => {
            return formBasketItemData(item)
        })

        const revenue = formedBaskedItems.reduce((acc, item) => {
            return acc += item?.price * item.quantity
        }, 0);
        const promocode = null

        const purchase = {
            id: Date.now().toString(),
            revenue: revenue,
            coupon: promocode ? promocode : ''
        }
        // console.log('Fourth step')
        purchaseDataLayer(formedBaskedItems, 'UAH', purchase);
    } catch (e) {
        console.log(e);
    }
}