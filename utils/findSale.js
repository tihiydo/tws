const findSale = (product) => {


    // console.log('ddd')
    // console.log(product)
    //product.id
    //product.count

    
    const result = [];
    for (const obj of product) {
        const { id, count } = obj;

        const categoryClothPrice = findSelectedCloth(obj?.Criterions)

        let existingObj = result.find((item) => item?.id === id && item?.cloth === categoryClothPrice?.selectedCloth);
    
        if (existingObj) {
          existingObj.count += count;
        } else {
          result.push({ id, count, cloth: categoryClothPrice?.selectedCloth, priceAdd: categoryClothPrice?.priceAdd });
        }
    }
    
    // console.log("===============");
    // console.log(result);

    return result;
}



const findSelectedCloth = (criterion) => {
    let selectedCloth = null;
    let priceAdd = null
    

    for (let i = 0; i < criterion.length; i++) {
        let index = criterion[i];
        
        if (index?.name == 'Категорія тканини' || index?.name == 'Катигорія тканини') {
            selectedCloth = index?.selected.name
            priceAdd = index?.selected.price

            // console.log(selectedCloth)
            break
        }
    }

    
    return {selectedCloth, priceAdd}
}

export default findSale;