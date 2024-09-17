
export const setViewDataLayer = (product, currCode) => {
    const dataLayerLayout = {
        'event': 'view_item',
        'ecommerce': {
            'currency': currCode,
            'value': Number(product?.price),
            'items': [
                product
            ]
        },
    }
    // console.log('view_item', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const setClickDataLayer = (item, currCode) => {
    const dataLayerLayout = {
        'event': 'select_item',
        'ecommerce': {
            'currency': currCode,
            'value': Number(item?.price),
            'item_list_id': item?.['item_list_id'],
            'item_list_name':  item?.['item_list_name'],
            'items': [
                item
            ]
        },
    }

    // console.log('select_item', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
    if (window?.fbq) {
        window?.fbq('track', 'ViewContent', {
            content_name: item.item_name,
            content_category: item.item_category,
            content_ids: [item.item_id],
            content_type: item.item_category,
            value: Number(item.price),
            currency: currCode
        })
    }

}

export const addToCartDataLayer = (productToAdd, currCode) => {
    const dataLayerLayout = {
        'event': 'add_to_cart',
        'ecommerce': {
            'currency': currCode,
            'value': Number(productToAdd?.price),
            'items': [
                productToAdd
            ]
        },
    }
    // console.log('add_to_cart', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
    if (window?.fbq) {
        window?.fbq('track', 'AddToCart', {
            content_name: productToAdd.item_name,
            content_category: productToAdd.item_category,
            content_ids: [productToAdd.item_id],
            content_type: productToAdd.item_category,
            value: Number(productToAdd.price),
            currency: currCode
        })
    }

}

export const removeFromCartDataLayer = (productToDel, currCode) => {
    const dataLayerLayout = {
        'event': 'remove_from_cart',
        'ecommerce': {
            'currency': currCode,
            'value': Number(productToDel?.price),
            'items': [
                productToDel
            ]
        },
    }
    // console.log('remove_from_cart', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const checkOutFirstStepDataLayer = (basketProducts, currCode, price) => {
    const dataLayerLayout = {
        'event': 'view_cart',
        'ecommerce': {
            'currency': currCode,
            'value': Number(price),
            'items': [
                ...basketProducts
            ]
        },
    }
    // console.log('view_cart', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const checkOutSecondStepDataLayer = (basketProducts, currCode, price) => {
    const dataLayerLayout = {
        'event': 'begin_checkout',
        'ecommerce': {
            'currency': currCode,
            'value': Number(price),
            'items': [
                ...basketProducts
            ]
        },
    }
    // console.log('begin_checkout', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);

    if (window?.fbq) {
        const contenetIds = basketProducts?.map(item => item?.item_id)
        window?.fbq('track', 'InitiateCheckout', {
            content_ids: contenetIds,
            value: Number(price),
            currency: currCode
        })
    }

}

export const purchaseDataLayer = (basketProducts, currCode, purchase) => {
    const dataLayerLayout = {
        'event': 'purchase',
        'ecommerce': {
            'currency': currCode,
            'value': Number(purchase?.revenue),
            'items': [
                ...basketProducts
            ]
        },
    }
    // console.log('purchase', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
    if (window?.fbq) {
        const contenetIds = basketProducts?.map(item => item?.item_id)
        window?.fbq('track', 'Purchase', {
            content_ids: contenetIds,
            value: Number(purchase.revenue),
            currency: currCode
        })
    }
}

