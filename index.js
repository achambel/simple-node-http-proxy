/**
 * It's a simple node http proxy
 * @author Adriano Chambel <acmlima.softweb@gmail.com>
 * */
const http = require('http');
const url = require('url');

http.createServer(onRequest).listen(3000);

function onRequest(req, res) {
  try {
    const queryString = url.parse(req.url, true).query;
    const target = new URL(queryString.target);
    const options = {
      headers: req.headers,
    };

    const proxy = http.request(target, options, (targetResponse) => {
      res.writeHead(targetResponse.statusCode, targetResponse.headers);
      targetResponse.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });
  } catch (err) {
    console.error(err.message);
    res.statusCode = 500;
    res.write('Ops, something went wrong due to: ' + err.message);
    return res.end();
  }
}