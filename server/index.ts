import * as http from "http";
import { PathHandler } from "./types";
import { promises as fs } from "fs";
import "./hmr";

const PUBLIC_PATH = "/../../client/public";
const routeReducer = (url: String): PathHandler => {
  switch (url) {
    case "/":
      return {
        GET: res => {
          fs.readFile(__dirname + `${PUBLIC_PATH}/index.html`)
            .then(contents => {
              res.setHeader("Content-Type", "text/html");
              res.writeHead(200);
              res.end(contents);
            })
            .catch(error => {
              console.log("Failed to load index.html: ", error);
              res.setHeader("Content-Type", "text/json");
              res.writeHead(500);
              res.end(JSON.stringify({ statusCode: 500, error }));
            });
        }
      };
    case "/hello":
      return {
        GET: () =>
          console.log(
            "Return the same SPA html with a different initial state?"
          )
      };
    default:
      return {
        GET: () => console.log("UNKNOWN URL: ", url)
      };
  }
};

const server = http.createServer((req, res) => {
  if (req.url.includes(".js")) {
    fs.readFile(__dirname + `${PUBLIC_PATH}${req.url}`)
      .then(contents => {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(contents);
      })
      .catch(error => {
        res.setHeader("Content-Type", "text/json");
        res.writeHead(500);
        res.end(
          JSON.stringify({
            statusCode: 500,
            reason: `Asset not found: ${req.url}: `,
            node_error: error
          })
        );
      });
  } else if (req.url.includes("favicon")) {
    fs.readFile(__dirname + `${PUBLIC_PATH}/ts-icon-48x48.ico`)
      .then(contents => {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end(contents);
      })
      .catch(error => {
        console.log("uckkk");
        res.setHeader("Content-Type", "text/json");
        res.writeHead(500);
        res.end(
          JSON.stringify({
            statusCode: 500,
            reason: `Asset not found: ${req.url}: `,
            node_error: error
          })
        );
      });
  } else {
    const pathHandler = routeReducer(req.url);
    pathHandler[req.method](res);
  }
});

server.listen(3030, (): void => console.log("Node is listening on 3030!"));
