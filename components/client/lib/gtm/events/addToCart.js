import {formItemData} from '../helpers/getDataFromItem.js';
import {addToCartDataLayer} from "../helpers/dataLayers.js";

export const addToCartGTM = (product) => {
    try {
        const dlvProduct = formItemData(product);
        addToCartDataLayer(dlvProduct, 'UAH')
    } catch (e) {
        console.log(e);
    }

}