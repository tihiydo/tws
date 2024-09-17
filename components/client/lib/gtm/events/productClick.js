import {formItemData} from '../helpers/getDataFromItem.js';
import {setClickDataLayer} from "../helpers/dataLayers.js";

export const productClick = (product) => {
    try {
        const dataLayerProduct = formItemData(product);
        setClickDataLayer(dataLayerProduct, "UAH")
    } catch (e) {
        console.log(e)
    }

}