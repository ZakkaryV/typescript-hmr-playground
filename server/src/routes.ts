import { getFile } from "./utils/file-loader";
import { PathHandler } from "./types";

export const rootRouteReducer = (url: String): PathHandler => {
  switch (url) {
    case "/":
      return {
        GET: async (res) => {
          try {
            await getFile("index.html").then(({ buf, headers }) => {
              for (const [header, value] of Object.entries(headers)) {
                if (value) res.setHeader(header, value);
              }

              res.writeHead(200);
              res.end(buf);
            });
          } catch (err) {
            throw new Error(`Failed to serve landing page: ${err}`);
          }
        },
      };
    case "/hello":
      return {
        GET: () =>
          console.log(
            "Return the same SPA html with a different initial state?"
          ),
      };
    default:
      return {
        GET: () => console.log("UNKNOWN URL: ", url),
      };
  }
};
