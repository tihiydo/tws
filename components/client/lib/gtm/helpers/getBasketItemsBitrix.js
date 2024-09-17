export const getBasketItemsBitrix = (items) => {
    const colors = [
        {name: 'Сірий', hex: '#a4a89e'},
        {name: 'Темно-сірий', hex: '#5a5a5a'},
        {name: 'Бежевий', hex: '#cdb5a3'},
        {name: 'Зелений', hex: '#657b59'},
        {name: 'Жовтий', hex: '#c8a61f'},
        {name: 'Голубий', hex: '#96beb8'},
        {name: 'Темно-голубий', hex: '#066a74'},
        {name: 'Темно-зелений', hex: '#206d51'}
    ]
    const bitrixBasketItems = items?.map(item => {
        const colorHex = item.color.slice(18, -1).toLowerCase();
        const colorName = colors.find(clr => clr.hex.toLowerCase().includes(colorHex))?.name;
        return ({PRODUCT_ID: item.id, PRICE: item.price.replace(/\D/g, ''), QUANTITY: item.numbers, PRODUCT_NAME: item.title + ' | ' + item.params + ' | ' + colorName});
    })
    // console.log(bitrixBasketItems);
    let counter = 0;
    const stringArr = bitrixBasketItems.map(item => {
        counter++
        return `
            ${counter}. ${item.PRODUCT_NAME} <br />
            Кількість: ${item.QUANTITY} <br />
            Ціна: ${item.PRICE} <br />
            <br />
        `
    })
    const string = stringArr.join('');
    return string;
}