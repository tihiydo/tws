import {formItemData} from '../helpers/getDataFromItem.js';
import {setViewDataLayer} from "../helpers/dataLayers.js";

export const productViewGTM = (product) => {
        const formedProduct = formItemData(product);
        setViewDataLayer(formedProduct, "UAH");
}