# tic-tac-toe
Tic Tac Toe application running on reactjs and graphql. No AI I'm afraid.

## Environment Variables

SERVER_PORT<Int> Port node instance listens: 3000

SERVER_HOST<String> Dns record: test.containers.company.com

SERVER_PROTOCOL<String> Protocol: http

SERVER_SESSION_SECRET<Strıng> Secret for session

BOARD_SIZE<Int> Dimensions of the board: 3

TOKENS<String> Comma seperated token list: X,O,H

## Example Compose

tic-tac-toe:
  image: knozcan/tic-tac-toe:initial
  container_name: tic-tac-toe
  environment:
    SERVER_PORT: 3000
    SERVER_HOST: localhost:3000
    SERVER_PROTOCOL: http
    SERVER_SESSION_SECRET: secret
    BOARD_SIZE: 5
    TOKENS: X,O,H
  ports:
    - "3000:3000"
