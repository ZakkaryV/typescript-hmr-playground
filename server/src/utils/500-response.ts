export const fiveHundredResponse = (url) => (res) => (error: Error): void => {
  console.error("500 ", url, error);
  res.setHeader("Content-Type", "text/json");
  res.writeHead(500);
  res.end(
    JSON.stringify({
      statusCode: 500,
      error,
    })
  );
};
