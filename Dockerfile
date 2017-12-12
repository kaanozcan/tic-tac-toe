FROM node:9

WORKDIR /tic-tac-toe
ADD . /tic-tac-toe

RUN npm install \
 && npm run build \
 && npm prune

CMD npm run start
