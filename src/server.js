import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const { groups } = url.match(route.path);
    const { query, ...params } = groups;
    req.params = params;
    req.query = extractQueryParams(query);
    route.handler(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3335, () => {
  console.log("Server is running on http://localhost:3335");
});
