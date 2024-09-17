"use client"

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
    export const setUtm = (href) => {
        let sessionArr = [];
        for (let sessionStorageKey in window?.sessionStorage) {
            sessionArr.push({key: sessionStorageKey, value: window?.sessionStorage.getItem(sessionStorageKey)})
        }
        const utmArr = sessionArr.filter(item => item?.key?.includes('utm'));
        // console.log(urlParams)
        if (utmArr.length) {
            const url = new URL(window?.location);
            utmArr.forEach(item => {
                url.searchParams.set(item?.key, item?.value.trim())
            })
            // console.log(url.search)
            // window.location.search = url?.searchParams?.toString();
            if (href.includes('?')) {
                const slicedSearch = url.search.slice(1);
                return href + '&' + slicedSearch;
            } else {
                return href + url.search
            }
        } else {
            return href;
        }
    }

export const saveUtm = () => {
    var utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'pxl'];

    if(typeof(Storage) !== "undefined") {
        sessionStorage.referrer = document.referrer;

        for(var i=0;i < utms.length;i++){
            var utm = utms[i],
                utm_value = getParameterByName(utm);
            if (utm_value) {
                window?.sessionStorage.setItem(utm, utm_value);
            }
        }
    } else {
        // Sorry! No Web Storage support..
    }
    // setUtm();
}
export const getUtmArr = () => {
    var utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utmObj = {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: '',
        utm_term: '',
    }
    for(var i=0;i < utms.length;i++){
        var utm = utms[i],
            utm_value = getParameterByName(utm);
        if (utm_value) {
            utmObj[utm] = window?.sessionStorage.getItem(utm)?.trim()
        }
    }
    // console.log(utmObj)
    return utmObj;
}
