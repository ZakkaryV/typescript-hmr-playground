import { promises as fs } from "fs";

let mimeTypes = new Map([
  [".html", "text/html"],
  [".css", "text/css"],
  [".js", "text/javascript"],
  [".json", "applications/json"],
  [".ico", "text/x-icon"],
  [".js.map", "application/json"],
]);

const getMimeType = (ext) => {
  const mimeType = mimeTypes.get(ext);
  if (mimeType) return mimeType;
  throw `Content-Type requested is unknown to the server: ${ext}`;
};

const PUBLIC_PATH = "/../../../client/public/";

export const getFile = (
  filePath
): Promise<{
  buf: Buffer;
  headers: { ["Content-Type"]: string; SourceMap?: string };
}> => {
  const ext: String = filePath.slice(filePath.indexOf("."));

  return fs.readFile(__dirname + `${PUBLIC_PATH}${filePath}`).then((buf) => ({
    buf,
    headers: {
      "Content-Type": getMimeType(ext),
      SourceMap: ext === ".js" ? `${filePath}.map` : undefined,
    },
  }));
};
