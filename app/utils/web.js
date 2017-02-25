export function urlEncodeData(data) {
  const params = Object.keys(data).map(key => data[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : '');
  return params.filter(value => !!value).join('&');
}
export function httpGetAsync(theUrl, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText);
    }
  };
  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  // xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlHttp.send(null);
}

