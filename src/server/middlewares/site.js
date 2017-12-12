import path from "path";
import config from "config";

const protocol = config.get("server.protocol");
const host = config.get("server.host");

export default (req, res, next) => res.send(`
  <html>
    <head>
      <meta charset="utf-8">
      <title>A Tic Tac Toe Game</title>

      <script src="${protocol}://${host}/public/bundle/index.js" charset="utf-8"></script>
    </head>
    <body>
      <div id="application-root"></div>
    </body>
  </html>
`)
