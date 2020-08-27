async function url(api,verb,body,querystring){
    return new Promise (function(resolve , reject){
        var url = `http://localhost:3333/${api}`;
        var xhr = new XMLHttpRequest();
        if(querystring!=null) {
            url += parseQueryString(querystring);
        }
        
        xhr.open(verb, url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }
                if (xhr.status === 204)
                        resolve(JSON.parse(xhr.status));
            }
            
        }
        if(body!=null){
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send(JSON.stringify(body));
        }else {
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send();

        }
        
    });
}

function isValidJson(json) {
    try {
        JSON.parse(JSON.stringify(json));
        return true;
    } catch (e) {
        return false;
    }
}

function parseQueryString(json){
    if(isValidJson(json)) {
        var queryString = "?"
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                queryString +=`${key}=${json[key]}&`;                
            }
        }
        
        return queryString.substring(0,queryString.lastIndexOf('&'));;

    } else {
        return ""
    }
}






