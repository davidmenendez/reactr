export default function ApiRequest(callback) {
  let req = new XMLHttpRequest();
  req.open('GET', '/api/tweets', true);
  req.onreadystatechange = function() {
    if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      callback(JSON.parse(this.response));
    }
  };
  req.send();
}