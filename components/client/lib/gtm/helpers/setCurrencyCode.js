
export const setCurrencyCode = () => {
    switch (window.currency) {
        case '$':
            window.currencyCode = 'USD'
            break;
        case '₴':
            window.currencyCode = 'UAH'
            break;
        case 'zł':
            window.currencyCode = 'PLN'
            break;
    }

}