import param from "@/components/client/utils/param";
import {parseProducts} from "@/components/client/utils/parseProducts";

export const getParsedContacts = (phone, name, surname) => {
    let listString = '';
    if (phone) {
        listString += `Телефон: ${phone}<br>`;
    }
    if (name) {
        listString += `Імʼя: ${name}<br>`;
    }
    if (surname) {
        listString += `Фамілія: ${surname} <br>`;
    }
    listString += '<br>';
    return listString;
}


export const getContactId = async (phone = "380632560923", name = '-', surname = '-') => {
    try {
        const url = new URL('https://twinsann.sytes.net/TS/hs/wh/contact');
        const params = {
            phone: phone.replace(/\D/g, ''),
            name,
            surname
        }
        const prms = param(params);
        const res = await fetch(`${url}?${prms}`);
        const contactId = await res.json();
        console.log(contactId)
        return String(contactId)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const addBitrixDeal = async (isOrder, data) => {
    try {
        // await bitrixDeal(isOrder, data)
        const typesBuying = [
            {type: 'manager_buy', value: 'Зв\'язатись з менеджером'},
            {type: 'prepayment_buy', value: 'Передплата'},
            {type: 'now_buy', value: 'Повна оплата'},
            {type: 'lead', value: 'Лід'}
        ]
        const typeBuying = typesBuying.find(item => item.type === data.payment_type).value;
        const url = new URL('https://twinsann.sytes.net/TS/hs/wh/new_order');
        const contactString = getParsedContacts(data.phone, data.name, data.surname);
        const typeBuyingString = data.name + ' - ' + typeBuying
        const contactId = await getContactId(data.phone, data.name, data.surname);
        // const contactId = getContactId(data?.phone?.replace(/\D/g, ''), data.name, data.surname);
        // if (typeof contactId !== 'string') throw new Error('Помилка отрмання контакту')
        if (isOrder) {
            const parsedProducts = parseProducts(data);
            const params = {
                'NAME': typeBuyingString,
                'CONTACT_ID': contactId,
                'STAGE_ID': 'UC_8S3FFK',
                'ADDRESS_CITY': data.department ? `${data.city} | ${data.department}` : data.city,
                'OPPORTUNITY': Number(data.price),
                'CURRENCY_ID': "UAH",
                'ADDRESS': data.address,
                'COMMENTS': `${typeBuyingString} <br/> ${contactString} <br/> ${parsedProducts}`,
                'UTM_CAMPAIGN': window?.sessionStorage.getItem('utm_campaign'),
                'UTM_CONTENT': window?.sessionStorage.getItem('utm_content'),
                'UTM_MEDIUM': window?.sessionStorage.getItem('utm_medium'),
                'UTM_SOURCE': window?.sessionStorage.getItem('utm_source'),
                'UTM_TERM': window?.sessionStorage.getItem('utm_term'),
                'UTM_ORGANIC': window?.sessionStorage.getItem('referrer'),
            }

            const prms = param(params);
            const res = await fetch(`${url}?${prms}`);
            const json = await res.json();
            console.log(json);

        } else {
            const params = {
                // 'TITLE': data.name + ' - ' + typeBuying,
                // 'NAME': data.name,
                'CONTACT_ID': contactId,
                'STAGE_ID': 'UC_8S3FFK',
                // 'OPPORTUNITY': Number(data.price),
                'COMMENTS': `${contactString}`,
                'UTM_CAMPAIGN': window?.sessionStorage.getItem('utm_campaign'),
                'UTM_ORGANIC': window?.sessionStorage.getItem('referrer'),
                'UTM_CONTENT': window?.sessionStorage.getItem('utm_content'),
                'UTM_MEDIUM': window?.sessionStorage.getItem('utm_medium'),
                'UTM_SOURCE': window?.sessionStorage.getItem('utm_source'),
                'UTM_TERM': window?.sessionStorage.getItem('utm_term'),
            }

            const prms = param(params);
            const res = await fetch(`${url}?${prms}`);
            const json = await res.json();
            console.log(json)
            if (!json.ok) {
                throw new Error('error')
            }
        }
    } catch (e) {
        console.log(e)
    }

}


export const getBitrixContact = async (phone, name = '-', surname = '-') => {
    try {
        // console.log('BITRIX CONTACT DATA', phone, name, surname)
        const urlAdd = new URL('https://twin-sann.bitrix24.eu/rest/1/tq0mlgfj182e1vx3/crm.contact.add.json');
        const urlSearch = new URL('https://twin-sann.bitrix24.eu/rest/1/98d6w4eqf23ylr19/crm.contact.list.json');
        const urlUpdate = new URL('https://twin-sann.bitrix24.eu/rest/1/levmfgx08bpcz7ap/crm.contact.update.json');

        const params = {
            'ORDER': {
                'DATE_CREATE': 'ASC'
            },
            'FILTER': {
                'PHONE': phone
            },
            'SELECT': ["ID", "NAME", "LAST_NAME"]
        }
        const prms = param(params);
        const res = await fetch(`${urlSearch}?${prms}`);
        const contacts = await res.json();

        if (!contacts?.result?.length) {
            const params = {
                FIELDS: {
                    "NAME": name,
                    "LAST_NAME": surname,
                    "TYPE_ID": "CLIENT",
                    "PHONE": [{"VALUE": phone}]
                }
            }
            const prms = param(params);
            const res = await fetch(`${urlAdd}?${prms}`);
            const contactId = await res.json();
            return contactId?.result;
        } else {
            const params = {
                id: contacts?.result?.[0]?.ID,
                FIELDS: {
                    "NAME": name,
                    "LAST_NAME": surname,
                }
            }
            const prms = param(params);
            await fetch(`${urlUpdate}?${prms}`);
            return contacts?.result?.[0]?.ID;
        }
    } catch (e) {
        console.log(e)
        throw e;
    }


}
export const bitrixDeal = async (isOrder, data) => {
    try {
        const typesBuying = [
            {type: 'manager_buy', value: 'Зв\'язатись з менеджером'},
            {type: 'prepayment_buy', value: 'Передплата'},
            {type: 'now_buy', value: 'Повна оплата'},
            {type: 'lead', value: 'Лід'}
        ]
        const typeBuying = typesBuying.find(item => item.type === data.payment_type).value;
        const url = new URL('https://twin-sann.bitrix24.eu/rest/1/2kpv0sbyxoin8g28/crm.deal.add.json');
        const contactId = await getBitrixContact(data.phone, data.name, data.surname);
        if (isOrder) {
            const parsedProducts = parseProducts(data);
            const params = {
                FIELDS: {
                    'TITLE': data.name + ' - ' + typeBuying,
                    'NAME': data.name,
                    'CONTACT_ID': contactId,
                    'STAGE_ID': 'C53:NEW',
                    'STAGE_SEMANTIC_ID': 'SUCCESS',
                    'CATEGORY_ID': '53',
                    'UF_CRM_1636651836384': '765',
                    'ADDRESS_CITY': data.department ? `${data.city} | ${data.department}` : data.city,
                    'OPPORTUNITY': Number(data.price),
                    'CURRENCY_ID': "UAH",
                    'ADDRESS': data.address,
                    'COMMENTS': `<br/> ${parsedProducts}`,
                    'UTM_CAMPAIGN': window?.sessionStorage.getItem('utm_campaign'),
                    'UTM_CONTENT': window?.sessionStorage.getItem('utm_content'),
                    'UTM_MEDIUM': window?.sessionStorage.getItem('utm_medium'),
                    'UTM_SOURCE': window?.sessionStorage.getItem('utm_source'),
                    'UTM_TERM': window?.sessionStorage.getItem('utm_term'),

                }
            }
            const prms = param(params);
            const res = await fetch(`${url}?${prms}`);
            const json = await res.json();
            console.log(json?.result);

        } else {
            const params = {
                FIELDS: {
                    'TITLE': data.name + ' - ' + typeBuying,
                    'NAME': data.name,
                    'CONTACT_ID': contactId,
                    'STAGE_ID': 'C53:NEW',
                    'STAGE_SEMANTIC_ID': 'SUCCESS',
                    'CATEGORY_ID': '53',
                    'UF_CRM_1636651836384': '765',
                    'COMMENTS': `<br/>`,
                    'UTM_CAMPAIGN': window?.sessionStorage.getItem('utm_campaign'),
                    'UTM_CONTENT': window?.sessionStorage.getItem('utm_content'),
                    'UTM_MEDIUM': window?.sessionStorage.getItem('utm_medium'),
                    'UTM_SOURCE': window?.sessionStorage.getItem('utm_source'),
                    'UTM_TERM': window?.sessionStorage.getItem('utm_term'),
                }
            }
            const prms = param(params);
            const res = await fetch(`${url}?${prms}`);
            const json = await res.json();
            console.log(json)
        }
    } catch (e) {
        console.log(e)
    }

}
