export const formItemData = (item) => {
    const itemCategory = item?.category?.name || item?.category;
    const itemSubcategory = item?.subcategory?.name || item?.subcategory;
    const itemCategoryString = itemSubcategory ? `${itemCategory}/${itemSubcategory}` : itemCategory;
    const itemCategoryId = item?.categoryId || item?.category?.id

    return ({
        'item_name': item.name,
        'item_id': item.id,
        'price': Number(item.price),
        'quantity': 1,
        'item_category': itemCategoryString,
        'item_list_name': itemCategoryString,
        'item_list_id': itemCategoryId,
        'item_variant': item.Colors[0]?.name,
    })
}

export const formBasketItemData = (item) => {
    const itemCategory = item?.category?.name || item?.category;
    const itemSubcategory = item?.subcategory?.name || item?.subcategory;
    const itemCategoryString = itemSubcategory ? `${itemCategory}/${itemSubcategory}` : itemCategory;
    const itemCategoryId = item?.categoryId || item?.category?.id
    return {
        'item_name': item.name,
        'item_id': item.id,
        'price': Number(item?.price),
        'quantity': Number(item?.count),
        'item_category': itemCategoryString,
        'item_list_name': itemCategoryString,
        'item_list_id': itemCategoryId,
        'item_variant': item?.color?.name,
    }
}

// category_title:"Пуфи"
// colors:"[\"background-color: #A4A89E;\",\"background-color: #545F5E;\",\"background-color: #CDB5A3;\",\"background-color: #5D453F;\",\"background-color: #000;\",\"background-color: #066A74;\",\"background-color: #206D51;\"]"
// discription:"<div><span style=\"color: rgb(33, 37, 41); font-family: Montserrat; font-size: 18px; white-space: pre-line;\"><b>Опис товару:</b></span></div><div><span style=\"color: rgb(33, 37, 41); font-family: Montserrat; font-size: 18px; white-space: pre-line; text-align: var(--bs-body-text-align);\"><br></span></div><div><span style=\"color: rgb(33, 37, 41); font-family: Montserrat; font-size: 18px; white-space: pre-line; text-align: var(--bs-body-text-align);\">Пуф - трансформер 5в1 - це п’ять повноціних м’яких стільчиків в одному пуфі.</span><br></div><div><span style=\"color: rgb(33, 37, 41); font-family: Montserrat; font-size: 18px; white-space: pre-line; text-align: var(--bs-body-text-align);\"><br></span></div><div><span style=\"color: rgb(33, 37, 41); font-family: Montserrat; font-size: 18px; white-space: pre-line;\">Такий пуф заощадить простір та стане гарним акцентом в будь-якому інтер’єрі. Пуф 5в1 легко розбирається та розбирається, в зібраному вигляді невеликий, м’який пуф, який займає мінімум місця.\n\nЦіна вказана за стандартну комплектації, в залежності від індивідуальних побажань може змінюватись.\n\nГабаритні розміри:\nСкладений пуф - 50х50х52см\nВисота посадки одного табурету - 47 см\nВага пуфа - 20 кг\n\nМатеріали:\nКаркас - профільна труба 15х15х1 мм. Порошкове фарбування. Пластикова заглушка.\nСидіння - високоякісне ДСП, поролон, синтепон, тканина.\n\nКолір та матеріал тканини можна підібрати індивідуально.\nДля цього залиште заявку на сайті та наш менеджер з Вами зв’яжеться. Також Ви можете самостійно зв’язатись з нами по телефону, Telegram/Viber та через контактні дані вказані на сайті.</span></div>"
// id:"39"
// images:"[{\"idColor\":\"0\",\"imgSrc\":\"img_63063c51c930a.webp\"},{\"idColor\":\"0\",\"imgSrc\":\"img_63063c5293f7a.webp\"},{\"idColor\":\"0\",\"imgSrc\":\"img_63063c534ac1d.webp\"},{\"idColor\":\"0\",\"imgSrc\":\"img_6315c7095b5ab.webp\"},{\"idColor\":\"0\",\"imgSrc\":\"img_6315c7149d306.webp\"},{\"idColor\":\"1\",\"imgSrc\":\"img_63063c7d78b68.webp\"},{\"idColor\":\"1\",\"imgSrc\":\"img_63063c7e340bc.webp\"},{\"idColor\":\"1\",\"imgSrc\":\"img_63063c7ecb600.webp\"},{\"idColor\":\"1\",\"imgSrc\":\"img_6315c7844fb03.webp\"},{\"idColor\":\"1\",\"imgSrc\":\"img_6315c7878e1d2.webp\"},{\"idColor\":\"2\",\"imgSrc\":\"img_63063c896adef.webp\"},{\"idColor\":\"2\",\"imgSrc\":\"img_63063c8a18920.webp\"},{\"idColor\":\"2\",\"imgSrc\":\"img_63063c8ab4c30.webp\"},{\"idColor\":\"2\",\"imgSrc\":\"img_6315c791d5758.webp\"},{\"idColor\":\"2\",\"imgSrc\":\"img_6315c796242e8.webp\"},{\"idColor\":\"3\",\"imgSrc\":\"img_62fc73e6f0d8c.webp\"},{\"idColor\":\"3\",\"imgSrc\":\"img_62fc73e7b564f.webp\"},{\"idColor\":\"3\",\"imgSrc\":\"img_62fc73e85ecb7.webp\"},{\"idColor\":\"3\",\"imgSrc\":\"img_6315c7a06546f.webp\"},{\"idColor\":\"3\",\"imgSrc\":\"img_6315c7a12368d.webp\"},{\"idColor\":\"4\",\"imgSrc\":\"img_62fc73f694f2b.webp\"},{\"idColor\":\"4\",\"imgSrc\":\"img_62fc73f756219.webp\"},{\"idColor\":\"4\",\"imgSrc\":\"img_62fc73f7ec780.webp\"},{\"idColor\":\"4\",\"imgSrc\":\"img_6315c8aa8cafe.webp\"},{\"idColor\":\"4\",\"imgSrc\":\"img_6315c8ab4ca24.webp\"},{\"idColor\":\"5\",\"imgSrc\":\"img_62fc7427d3fe0.webp\"},{\"idColor\":\"5\",\"imgSrc\":\"img_62fc7428a1a18.webp\"},{\"idColor\":\"5\",\"imgSrc\":\"img_62fc742953692.webp\"},{\"idColor\":\"5\",\"imgSrc\":\"img_6315c7c1ce444.webp\"},{\"idColor\":\"5\",\"imgSrc\":\"img_6315c7c28d9f3.webp\"},{\"idColor\":\"6\",\"imgSrc\":\"img_62fc769b30845.webp\"},{\"idColor\":\"6\",\"imgSrc\":\"img_62fc7b8b2e183.webp\"},{\"idColor\":\"6\",\"imgSrc\":\"img_62fc7b8be3a65.webp\"},{\"idColor\":\"6\",\"imgSrc\":\"img_6315cab86f61b.webp\"},{\"idColor\":\"6\",\"imgSrc\":\"img_6315cabc06ce6.webp\"}]"
// main_item_id:"39"
// on_main:"true"
// parametrs:"[{\"typeParametr\":\"Категорія тканини\",\"someParametrs\":\"Економ[0]{Економ - звичайний велюр, розрахований на 1-2 роки активного користування}|Стандарт[330]{Стандарт - велюр середньої якості, розрахований на 3-4 роки активного виристування}|Топ[830]{Топ - практичний, вологостійкий на 65% велюр, розрахований на 5-6 років активного користування}|Люкс[1400]{Люкс - водостійкий на 100% велюр з властивістю антикіготь на 100%, розрахований на 7-8 років активного користування}\",\"parametrText\":\"\"},{\"typeParametr\":\"Колір каркасу\",\"someParametrs\":\"Чорний[0]|Білий[300]|Срібний[300]|Золотий[300]\",\"parametrText\":\"металевий каркас пофарбований порошковою фарбою, тому стійкий до будь-яких пошкоджень.\"}]"
// pre_discription:"Індивідуальне виготовлення від 15 робочих днів"
// price:"{\"price\":\"2990\",\"priceSell\":\"149.5\",\"pricePosition\":true}"
// recomend:"true"
// sub_category_title:""
// title:"Пуф 5в1  | метал"

