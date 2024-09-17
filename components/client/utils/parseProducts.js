export const parseProducts = ({products, promocode, shipping_type, address, department, city}) => {
	let listString = '';
	if (promocode) {
		listString += `Промокод: ${promocode.name} - ${promocode.value} ${promocode.type}<br>`;
	}
	if (shipping_type === 'department') {
		listString += `Місто - ${city} <br>`;
		listString += `Відділення - ${department} <br> <br>`;
	}
	if (shipping_type === 'address') {
		listString += `Адреса - ${address} <br> <br>`;
	}
	for (let i = 0; i < products.length; i++) {
		const product = products[i];

		// Add product name to the list
		listString += `${i + 1}. ${product.name}<br>`;

		// Add criteria to the list
		for (let j = 0; j < product.Criterions.length; j++) {
			const criterion = product.Criterions[j];
			listString += `${criterion.name}: ${criterion.selected.name}<br>`;
		}

		// Add category to the list
		listString += `Категорія: ${product.category ? product.category : 'Немає'}<br>`;
		listString += `Колір: ${product.color.name}`;
		listString += `<div style="background-color: ${product.color.name}; display: inline-block; height: 30px; width: 30px; border-radius: 50%"></div><br>`;
		listString += `Ціна: ${product.price ? product.price: 0}<br>`;
		listString += `Кількість: ${product.count ? product.count: 0}<br>`;

		// Add subcategory to the list
		if (product.subcategory) {
			listString += `Підкатегорія: ${product.subcategory}<br><br>`;
		}
	}
	return listString;
}