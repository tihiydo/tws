import {ajaxMain} from "../../server/ajax.control.js";
import {selectAllOrder} from "../../shared-components/basket/basket.control.js";

export const getBasketItems = () => {
    const dbProducts = ajaxMain('../../server/database/items/item.control.php', {event: 'serchItem', language: window.language});

    let dbBasketItems = selectAllOrder()
    if (dbBasketItems === '[]') {
        return [];
    }
    dbBasketItems = dbBasketItems?.slice(0, dbBasketItems.length-2) + ']';
    // console.log(JSON.parse(dbBasketItems))
    const basketItemsIdAndQuantity = JSON.parse(dbBasketItems)?.map(item => {
        return {id: item.id, quantity: item.numbers, params: item.params, price: Number(item.price.slice(0, -1))}
    })
    // const filteredDbBasketItems = dbProducts.filter((product) => {
    //     return basketItemsIdAndQuantity.find(id => product.id === id);
    // })

    const basketItems = basketItemsIdAndQuantity.map(item => {
        const dbProductItem = dbProducts.find(bsktItem => bsktItem.id === item.id);
        return {...dbProductItem, quantity: Number(item.quantity), params: item.params, price: item.price}
    })
    // console.log(basketItems)
    return basketItems;
}