import * as http from "http";
import { getFile } from "./utils/file-loader";
import { rootRouteReducer } from "./routes";
import { fiveHundredResponse } from "./utils/500-response";
import { initHotModuleReloading } from "./hmr";

const { PORT = 3030 } = process.env;

const server = http.createServer((req, res): void => {
  const { url } = req;
  const pathSegments = url.split("/");
  const staticAssetRequested =
    pathSegments[pathSegments.length - 1].indexOf(".") > -1;
  const errorHandler = fiveHundredResponse(url);

  if (staticAssetRequested) {
    getFile(url)
      .then(({ buf, headers }) => {
        for (const [header, value] of Object.entries(headers)) {
          if (value) res.setHeader(header, value);
        }

        res.writeHead(200);
        res.end(buf);
      })
      .catch(fiveHundredResponse(res));
  } else {
    const pathHandler = rootRouteReducer(req.url);

    pathHandler[req.method](res).catch(errorHandler(res));
  }
});

initHotModuleReloading(server);

server.listen(PORT, (): void => console.log(`Node is listening on ${PORT}!`));
