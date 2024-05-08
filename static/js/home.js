const xhr = new XMLHttpRequest()
const method = "GET"
const url = "/tweets"
const responseType = "json"

xhr.responseType = responseType;
xhr.open(method, url);
xhr.onload = function() {
    // console.log(xhr.response);
    const serverResponse = xhr.response;
    var listedItems = serverResponse.response;
}
xhr.send()