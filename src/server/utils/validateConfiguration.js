import config from "config";

const genericMessage = (key) => `Unrecognized input on config '${key}'.`;

const keys = [
  "server.host",
  "server.port",
  "server.protocol",
  "game.board.size",
  "game.board.tokens"
];

const host = config.get("server.host"),
      port = config.get("server.port"),
      protocol = config.get("server.protocol"),
      size = config.get("game.board.size"),
      tokens = config.get("game.board.tokens");

keys.forEach((key) => {
  const value = config.get(key);

  if (!value || value === "") {
    throw new Error(genericMessage(key));
  }
});

if (size !== "3" && size !== "5" && size !== "7") {
  throw new Error(genericMessage("game.board.size") + " Should be one of [3, 5, 7]");
}

if (tokens.replace(/ /g, "").split(",", 3).length < 3) {
  throw new Error("Inefficient number of inputs on config 'game.board.tokens'.");
}
