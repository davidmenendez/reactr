export default function ApiRequest(api, action, params, callback) {
  var loader = document.querySelector('.loader');
  loader.classList.add('loader--active');
  let req = new XMLHttpRequest();
  let url = '/api/' + api;
  if (params.cursor)
    url += params.cursor;

  req.open(action, url, true);

  if(action == 'POST')
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  req.onload = function() {
    if(req.readyState === 4) {
      loader.classList.remove('loader--active');
      if (req.status !== 200)
        console.error(req.statusText)
      if (callback)
        callback(JSON.parse(this.response));
    }
  };

  req.send(JSON.stringify(params));
}