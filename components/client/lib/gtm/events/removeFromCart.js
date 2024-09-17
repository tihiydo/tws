import {formBasketItemData} from '../helpers/getDataFromItem.js';
import {removeFromCartDataLayer} from "../helpers/dataLayers.js";

export const removeFromCart = (productToDelete) => {
    try {
        const dataLayerProductToDelete = formBasketItemData(productToDelete);
        removeFromCartDataLayer(dataLayerProductToDelete, "UAH");

    } catch (e) {
        console.log(e);
    }

}