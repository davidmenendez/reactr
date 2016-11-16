let reqCounter = 0;

export default function ApiRequest(path, action, callback) {
  var loader = document.querySelector('.loader');
  loader.classList.add('loader--active');
  reqCounter++;

  let req = new XMLHttpRequest();
  let fullPath = '/api/' + path;
  action = action.toUpperCase();

  req.open(action, fullPath, true);

  if(action == 'POST')
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  req.onload = function() {
    if(req.readyState === 4) {
      reqCounter--;
      if (reqCounter === 0)
        loader.classList.remove('loader--active');
      if (req.status !== 200)
        console.error(req.statusText)
      if (callback)
        callback(JSON.parse(this.response));
    }
  };

  req.send();
}