export default function defaultheader(){
    return {
        method: null,
        body: null,
        crossDomain: true,
        cache: false,
        async: false,
        timeout: 3000,
        headers: {
            "Content-Type": "application/json",
            "Authorization":"",
            "Accept": "*/*",
            "Access-Control-Allow-Headers":"*",
            "Access-Control-Allow-Headers":"*",
            "X-Requested-With":"XMLHttpRequest"
        },
    };
};
