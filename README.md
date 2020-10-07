### How to use it?

```bash
git clone https://github.com/achambel/simple-node-http-proxy

cd simple-node-http-proxy

node index.js
```

### Making a http request to the proxy

It only supports http requests and method GET for now.

```bash
curl http://localhost:3000?target=http://somedomain.org
```
