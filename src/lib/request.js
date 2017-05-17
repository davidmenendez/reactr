let reqCounter = 0;

export default function ApiRequest(path, action, callback) {
  const loader = document.querySelector('.loader');
  loader.classList.add('loader--active');
  reqCounter += 1;

  const req = new XMLHttpRequest();
  const fullPath = `/api/${path}`;

  req.open(action.toUpperCase(), fullPath, true);

  if (action.toUpperCase() === 'POST') {
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  }

  req.onload = function() {
    if (req.readyState === 4) {
      reqCounter -= 1;
      if (reqCounter === 0) {
        loader.classList.remove('loader--active');
      }
      if (req.status !== 200) {
        console.error(req.statusText);
      }
      if (callback) {
        callback(JSON.parse(this.response));
      }
    }
  };

  req.send();
}
